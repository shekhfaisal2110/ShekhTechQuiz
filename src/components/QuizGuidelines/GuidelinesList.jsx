// components/QuizGuidelines/GuidelinesList.jsx
import React from "react";
import { FileLock2 } from "lucide-react";

export default function GuidelinesList() {
  return (
    <div className="max-w-4xl mx-auto bg-white/90 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl border border-gray-200 p-5 sm:p-8 mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-4 sm:mb-6 flex items-center">
        <FileLock2 className="w-6 sm:w-7 h-6 sm:h-7 text-blue-500 mr-2" />
        Quiz Participation Guidelines
      </h2>

      <ol className="list-decimal list-inside space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700 mb-6 sm:mb-8">
        <li>
          <span className="font-semibold text-blue-700">Honesty First:</span> 
          Attempt all quizzes without external help, resources, or collaboration.
        </li>
        <li>
          <span className="font-semibold text-blue-700">Time Limit:</span> 
          Each quiz has a strict 5-minute timer. Ensure you complete before time runs out.
        </li>
        <li>
          <span className="font-semibold text-blue-700">Single Session:</span>
          Do not refresh, switch tabs, or leave the quiz window during an attempt. Multiple session violations may terminate your quiz automatically.
        </li>
        <li>
          <span className="font-semibold text-blue-700">No Plagiarism:</span>
          Copying, pasting, or reusing answers from external sources is strictly forbidden and monitored.
        </li>
        <li>
          <span className="font-semibold text-blue-700">Screenshot Policy:</span>
          Screenshots and any form of digital capture are detected and will result in warnings or auto-termination of the quiz.
        </li>
        <li>
          <span className="font-semibold text-blue-700">Result Integrity:</span>
          Results reflect your personal effort. Misconduct may lead to disqualification or profile suspension.
        </li>
        <li>
          <span className="font-semibold text-blue-700">Respect the System:</span>
          Do not try to manipulate, refresh, or bypass quiz restrictions or security systems.
        </li>
      </ol>
    </div>
  );
}