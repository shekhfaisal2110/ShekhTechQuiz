
// src/data/faqData.js
export const faqData = [
  // Getting Started (5 questions)
  {
    id: 1,
    category: 'Getting Started',
    question: 'Do I need to create an account to take quizzes?',
    answer: 'No! ShekhTech Quiz Platform offers anonymous participation. You can start quizzing immediately without any account creation, personal data collection, or login requirements. Your privacy is completely protected.',
    icon: 'UserCheck',
    popular: true
  },
  {
    id: 2,
    category: 'Getting Started',
    question: 'Is the quiz platform mobile-friendly?',
    answer: 'Yes! The platform features a modern, mobile-friendly interface optimized for all devices. You can take quizzes on smartphones, tablets, or desktop computers with the same security and functionality.',
    icon: 'BookOpen',
    popular: true
  },
  {
    id: 3,
    category: 'Getting Started',
    question: 'How do I start my first quiz?',
    answer: 'Simply browse the available courses on the homepage, select any quiz that interests you, and click "Start Quiz". No registration or setup required - you can begin immediately.',
    icon: 'Zap'
  },
  {
    id: 4,
    category: 'Getting Started',
    question: 'What types of quizzes are available?',
    answer: 'We offer a wide variety of quizzes covering topics like programming, web development, digital marketing, Python, React, Node.js, and many more technical subjects.',
    icon: 'BookOpen'
  },
  {
    id: 5,
    category: 'Getting Started',
    question: 'Are there any age restrictions for taking quizzes?',
    answer: 'No, there are no age restrictions. Our platform is suitable for learners of all ages, from students to professionals looking to test their knowledge.',
    icon: 'Users'
  },

  // Quiz Rules (5 questions)
  {
    id: 6,
    category: 'Quiz Rules',
    question: 'What is the time limit for each quiz?',
    answer: 'Each quiz has a strict 5-minute timer. You must complete all questions before time runs out. The timer is clearly displayed during the quiz, and you cannot pause or extend the time limit.',
    icon: 'Timer',
    popular: true
  },
  {
    id: 7,
    category: 'Quiz Rules',
    question: 'What constitutes honest participation?',
    answer: 'Honest participation means attempting quizzes without external help, resources, or collaboration. Use only your own knowledge and skills. No plagiarism, cheating, or manipulation of the quiz system is allowed.',
    icon: 'CheckCircle'
  },
  {
    id: 8,
    category: 'Quiz Rules',
    question: 'What happens if I don\'t answer all questions?',
    answer: 'You should attempt all questions to maximize your score. Guesses are better than blank answers! However, you must complete within the 5-minute time limit, and unanswered questions will be marked as incorrect.',
    icon: 'Clock'
  },
  {
    id: 9,
    category: 'Quiz Rules',
    question: 'Can I refresh the page during a quiz?',
    answer: 'No, refreshing the page during a quiz is not allowed and will terminate your current attempt. You must complete the entire quiz in a single session without refreshing, switching tabs, or leaving the quiz window.',
    icon: 'X'
  },
  {
    id: 10,
    category: 'Quiz Rules',
    question: 'What happens if I run out of time?',
    answer: 'If the 5-minute timer expires, the quiz will automatically submit with your current answers. Any unanswered questions will be marked as incorrect, and you\'ll receive your score based on completed answers.',
    icon: 'AlertTriangle'
  },

  // Security (6 questions)
  {
    id: 11,
    category: 'Security',
    question: 'Why can\'t I switch tabs or minimize the browser during quizzes?',
    answer: 'Tab switching is monitored as part of our anti-cheat system. Multiple tab switches will result in automatic quiz termination. You must stay in the quiz window for the entire duration to maintain session integrity.',
    icon: 'Shield',
    popular: true
  },
  {
    id: 12,
    category: 'Security',
    question: 'What happens if I try to copy or paste during a quiz?',
    answer: 'Copy and paste operations are completely blocked and monitored. Any attempt to copy quiz content or paste external answers will trigger security warnings and may lead to quiz termination.',
    icon: 'Lock',
    popular: true
  },
  {
    id: 13,
    category: 'Security',
    question: 'Are screenshots allowed during quizzes?',
    answer: 'No, screenshots and any form of digital capture are strictly forbidden. Our system detects screenshot attempts and will issue warnings or automatically terminate the quiz for violations.',
    icon: 'Camera'
  },
  {
    id: 14,
    category: 'Security',
    question: 'How many security violations are allowed?',
    answer: 'Maximum 3 security violations are allowed per quiz attempt. After 3 violations, the quiz will automatically terminate with a zero score. Violations include tab switching, copy attempts, developer tools usage, etc.',
    icon: 'AlertTriangle'
  },
  {
    id: 15,
    category: 'Security',
    question: 'Can I use developer tools or inspect element during quizzes?',
    answer: 'No, developer tools are completely blocked. Attempting to open F12, Ctrl+Shift+I, or any developer tools will trigger immediate security violations and may result in quiz termination.',
    icon: 'Lock'
  },
  {
    id: 16,
    category: 'Security',
    question: 'What are the consequences of cheating or system abuse?',
    answer: 'Any attempts at cheating will result in immediate quiz termination, zero scores, and potential temporary access restrictions. The platform has real-time cheat detection and progressive warning systems.',
    icon: 'Shield'
  },

  // Multiple Attempts (4 questions)
  {
    id: 17,
    category: 'Multiple Attempts',
    question: 'Can I retake a quiz if I don\'t pass?',
    answer: 'Yes! You can take any quiz multiple times with no limit on attempts. Each attempt is independent with a fresh timer, and your highest score is recorded. Questions may be randomized between attempts.',
    icon: 'RotateCcw',
    popular: true
  },
  {
    id: 18,
    category: 'Multiple Attempts',
    question: 'Which score counts if I take multiple attempts?',
    answer: 'Your highest score is always recorded and used for certification. Previous attempts remain visible during your session, and each attempt gets a fresh 5-minute timer with potentially randomized questions.',
    icon: 'Star'
  },
  {
    id: 19,
    category: 'Multiple Attempts',
    question: 'How should I use multiple attempts strategically?',
    answer: 'Use your first attempt to assess difficulty level, review results to identify weak areas, study missed topics before the next attempt, take breaks between attempts for better focus, and save certificates immediately after success.',
    icon: 'Zap'
  },
  {
    id: 20,
    category: 'Multiple Attempts',
    question: 'Is there a waiting period between attempts?',
    answer: 'No, there\'s no waiting period! You can start a new attempt immediately after completing the previous one. This allows for continuous learning and improvement.',
    icon: 'Clock'
  },

  // Results & Certificates (5 questions)
  {
    id: 21,
    category: 'Results & Certificates',
    question: 'How do I get my certificate after passing?',
    answer: 'Certificates are issued immediately for high performers after quiz completion. Since no login is required, you must save or download your certificate immediately as it won\'t be stored in any account.',
    icon: 'Award'
  },
  {
    id: 22,
    category: 'Results & Certificates',
    question: 'Will my progress be saved if I clear my browser?',
    answer: 'No, since the platform is anonymous and session-based, clearing your browser will lose all history and results. Make sure to save certificates and results immediately after completion.',
    icon: 'Eye'
  },
  {
    id: 23,
    category: 'Results & Certificates',
    question: 'How quickly do I see my results?',
    answer: 'Results are displayed immediately after quiz completion with detailed score breakdown. You\'ll see your score, correct answers, and certificate (if qualified) instantly on the results page.',
    icon: 'FileText'
  },
  {
    id: 24,
    category: 'Results & Certificates',
    question: 'What percentage do I need to pass and get a certificate?',
    answer: 'You need to score 70% or higher (7 out of 10 questions correct) to pass the quiz and receive a certificate. Anything below 70% is considered a failing grade.',
    icon: 'Award'
  },
  {
    id: 25,
    category: 'Results & Certificates',
    question: 'Can I print my certificate?',
    answer: 'Yes! Once you receive your digital certificate, you can save it as PDF or print it directly from your browser. Make sure to do this immediately as certificates won\'t be stored.',
    icon: 'FileText'
  },

  // Technical (5 questions)
  {
    id: 26,
    category: 'Technical',
    question: 'What should I do to prepare my device for the quiz?',
    answer: 'Ensure your device is charged, maintain stable internet connection, close unnecessary applications, set browser zoom to 100%, and choose a distraction-free environment. Use modern browsers like Chrome, Firefox, Safari, or Edge.',
    icon: 'Settings'
  },
  {
    id: 27,
    category: 'Technical',
    question: 'What if I experience technical issues during a quiz?',
    answer: 'If you encounter technical problems, contact support immediately at support@shekhtech.com. However, technical issues don\'t extend the 5-minute timer, so ensure stable internet and proper device setup beforehand.',
    icon: 'AlertTriangle'
  },
  {
    id: 28,
    category: 'Technical',
    question: 'Which browsers work best with the quiz platform?',
    answer: 'The platform works optimally on Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. We recommend using the latest browser version and disabling extensions that might interfere with the quiz.',
    icon: 'Settings'
  },
  {
    id: 29,
    category: 'Technical',
    question: 'What internet speed is recommended for quizzes?',
    answer: 'A stable internet connection of at least 1 Mbps is recommended. While quizzes don\'t require high bandwidth, a stable connection prevents timeouts and ensures smooth navigation.',
    icon: 'Zap'
  },
  {
    id: 30,
    category: 'Technical',
    question: 'Can I take quizzes on my mobile device?',
    answer: 'Yes! The platform is fully responsive and works perfectly on mobile devices. However, ensure your screen is large enough to read questions comfortably and you have a stable touch interface.',
    icon: 'BookOpen'
  }
];

export default faqData;

