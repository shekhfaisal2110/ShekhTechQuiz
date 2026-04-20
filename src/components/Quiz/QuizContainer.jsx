// components/Quiz/QuizContainer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../../data/courses';
import SecurityAlert from '../Home/SecurityAlert';
import QuizHeader from './QuizHeader';
import QuestionCard from './QuestionCard';
import NavigationButtons from './NavigationButtons';
import QuestionNavigator from './QuestionNavigator';
import SecurityOverlay from './SecurityOverlay';
import QuizNotFound from '../QuizNotFound';

// ✅ Fisher-Yates shuffle helper
function shuffleWithOptions(question) {
  const { options, correctIndex } = question;
  const labeled = options.map((text, i) => ({
    text,
    isCorrect: i === correctIndex
  }));

  for (let i = labeled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [labeled[i], labeled[j]] = [labeled[j], labeled[i]];
  }

  const newCorrectIndex = labeled.findIndex(item => item.isCorrect);
  return {
    ...question,
    options: labeled.map(item => item.text),
    correctIndex: newCorrectIndex
  };
}

export default function QuizContainer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === courseId);

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // Security state
  const [securityAlert, setSecurityAlert] = useState({ isOpen: false, type: null });
  const [violationCount, setViolationCount] = useState({
    copy: 0, paste: 0, rightclick: 0, screenshot: 0, tabswitch: 0, devtools: 0
  });
  const [isTabActive, setIsTabActive] = useState(true);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  
  const quizContainerRef = useRef(null);
  const lastUserActivityRef = useRef(Date.now());

  // ✅ Shuffle questions on course load
  useEffect(() => {
    if (course) {
      const shuffled = course.questions.map(q => shuffleWithOptions(q));
      setShuffledQuestions(shuffled);
      setCurrentQuestion(0);
      setAnswers({});
    }
  }, [courseId, course]);

  // --- [All security logic remains unchanged] ---
  const showSecurityAlert = (type) => {
    setViolationCount(prev => ({ ...prev, [type]: prev[type] + 1 }));
    setSecurityAlert({ isOpen: true, type });
  };

  const closeSecurityAlert = () => {
    setSecurityAlert({ isOpen: false, type: null });
  };

  const terminateQuiz = (reason) => {
    navigate('/', {
      state: { terminated: true, reason, courseTitle: course?.title }
    });
  };

  // Security event listeners (identical to original)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
        (e.ctrlKey && e.keyCode === 85) ||
        (e.ctrlKey && e.shiftKey && e.keyCode === 67) ||
        (e.ctrlKey && e.keyCode === 67) ||
        (e.ctrlKey && e.keyCode === 86) ||
        (e.ctrlKey && e.keyCode === 65) ||
        (e.ctrlKey && e.keyCode === 83) ||
        (e.ctrlKey && e.keyCode === 80) ||
        e.keyCode === 44
      ) {
        e.preventDefault();
        if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74))) {
          showSecurityAlert('devtools');
        } else if (e.ctrlKey && e.keyCode === 67) {
          showSecurityAlert('copy');
        } else if (e.ctrlKey && e.keyCode === 86) {
          showSecurityAlert('paste');
        } else if (e.ctrlKey && e.keyCode === 83 || e.keyCode === 44) {
          showSecurityAlert('screenshot');
        }
        return false;
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      showSecurityAlert('rightclick');
      return false;
    };

    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    const handleCopy = (e) => {
      e.preventDefault();
      showSecurityAlert('copy');
      return false;
    };

    const handlePaste = (e) => {
      e.preventDefault();
      showSecurityAlert('paste');
      return false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);

    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.mozUserSelect = '';
      document.body.style.msUserSelect = '';
    };
  }, []);

  // Tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabActive(false);
        setTabSwitchCount(prev => prev + 1);
        showSecurityAlert('tabswitch');
      } else {
        setIsTabActive(true);
        lastUserActivityRef.current = Date.now();
      }
    };

    const handleWindowBlur = () => {
      setIsTabActive(false);
      setTabSwitchCount(prev => prev + 1);
      showSecurityAlert('tabswitch');
    };

    const handleWindowFocus = () => {
      setIsTabActive(true);
      lastUserActivityRef.current = Date.now();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  // Auto-terminate
  useEffect(() => {
    const total = Object.values(violationCount).reduce((sum, c) => sum + c, 0);
    if (total >= 5 || tabSwitchCount >= 3) {
      terminateQuiz('Multiple security violations detected');
    }
  }, [violationCount, tabSwitchCount]);

  // Inactivity redirect
  useEffect(() => {
    const check = setInterval(() => {
      if (!isTabActive && (Date.now() - lastUserActivityRef.current) > 5000) {
        navigate('/');
      }
    }, 1000);
    return () => clearInterval(check);
  }, [isTabActive, navigate]);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !isFinished && isTabActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishQuiz();
    }
  }, [timeLeft, isFinished, isTabActive]);

  // Back button
  useEffect(() => {
    const handlePopState = () => navigate('/');
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  // Utilities
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft > 300) return 'text-emerald-600';
    if (timeLeft > 120) return 'text-yellow-600';
    return 'text-red-600 animate-pulse';
  };

  const handleAnswerSelect = (questionId, selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    setAnswers(prev => ({ ...prev, [questionId]: selectedIndex }));
    lastUserActivityRef.current = Date.now();
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    lastUserActivityRef.current = Date.now();
  };

  const handlePrevious = () => {
    setSelectedAnswer(null);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
    lastUserActivityRef.current = Date.now();
  };

  const handleFinishQuiz = () => {
    setIsFinished(true);
    const score = calculateScore();
    navigate('/result', {
      state: {
        course,
        answers,
        score,
        totalQuestions: shuffledQuestions.length,
        timeLeft,
        passed: score >= 7,
        securityViolations: violationCount,
        tabSwitches: tabSwitchCount
      }
    });
  };

  const calculateScore = () => {
    let correct = 0;
    shuffledQuestions.forEach(question => {
      if (answers[question.id] === question.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleBackClick = () => {
    navigate('/');
  };

  // ✅ Guard: Show loading or not-found if course or questions not ready
  if (!course) {
    return <QuizNotFound />;
  }

  if (shuffledQuestions.length === 0) {
    // Optional: show a loader, or just return null briefly
    return <div className="min-h-screen flex items-center justify-center">Loading quiz...</div>;
  }

  const currentQ = shuffledQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const isCurrentAnswered = answers[currentQ.id] !== undefined;

  return (
    <div 
      ref={quizContainerRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden"
      style={{ userSelect: 'none' }}
    >
      <SecurityAlert
        isOpen={securityAlert.isOpen}
        onClose={closeSecurityAlert}
        alertType={securityAlert.type}
        onTerminate={() => terminateQuiz('Security violation')}
      />

      <SecurityOverlay
        isTabActive={isTabActive}
        tabSwitchCount={tabSwitchCount}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <QuizHeader
        courseTitle={course.title}
        timeLeft={timeLeft}
        answeredCount={answeredCount}
        totalQuestions={shuffledQuestions.length}
        isTabActive={isTabActive}
        onBackClick={handleBackClick}
        getTimeColor={getTimeColor}
        formatTime={formatTime}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
          <div className="p-4 sm:p-6 md:p-8">
            <QuestionCard
              question={currentQ}
              questionIndex={currentQuestion}
              selectedAnswer={selectedAnswer}
              answers={answers}
              onAnswerSelect={(index) => handleAnswerSelect(currentQ.id, index)}
              onMouseEnterAnswer={setSelectedAnswer}
            />

            <NavigationButtons
              currentQuestion={currentQuestion}
              totalQuestions={shuffledQuestions.length}
              answeredCount={answeredCount}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onFinish={handleFinishQuiz}
            />
          </div>
        </div>

        <QuestionNavigator
          questions={shuffledQuestions}
          currentQuestion={currentQuestion}
          answers={answers}
          onQuestionSelect={setCurrentQuestion}
          violationCount={violationCount}
        />
      </div>
    </div>
  );
}