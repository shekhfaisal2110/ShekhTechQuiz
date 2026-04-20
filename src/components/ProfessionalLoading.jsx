// import LogoImg from "../assets/sign/sfLogo.png";

// const ProfessionalLoading = () => {
//   return (
//     <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
//       {/* Main Content — Minimal, Centered, Elegant */}
//       <div className="flex flex-col items-center space-y-6 px-4 text-center">

//         {/* Logo — Scales in gently (like Qwen) */}
//         <div className="animate-scale-in">
//           <img
//             src={LogoImg}
//             alt="Loading..."
//             className="w-20 h-20 md:w-28 md:h-28 object-contain"
//             style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.06))' }}
//           />
//         </div>

//         {/* Loading Text — Typing style, like AI initializing */}
//         <div className="flex flex-col items-center space-y-3">
//           <p className="text-gray-600 font-medium text-sm md:text-base tracking-wide leading-relaxed">
//              Loading
//             <span className="inline-block animate-typing-ellipsis ml-1">...</span>
//           </p>
//         </div>

//       </div>

//       {/* Custom Animations — Qwen Style */}
//       <style jsx>{`
//         @keyframes scale-in {
//           0% { transform: scale(0.95); opacity: 0; }
//           100% { transform: scale(1); opacity: 1; }
//         }
//         @keyframes typing-ellipsis {
//           0% { content: "."; }
//           33% { content: ".."; }
//           66% { content: "..."; }
//           100% { content: "..."; }
//         }
//         .animate-scale-in {
//           animation: scale-in 0.8s ease-out forwards;
//         }
//         .animate-typing-ellipsis::after {
//           content: '';
//           display: inline-block;
//           animation: typing-ellipsis 1.8s infinite steps(1);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProfessionalLoading;







import LogoImg from "../assets/sign/sfLogo.png";

const ProfessionalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Glassmorphism Container */}
      <div className="relative flex flex-col items-center justify-center space-y-8 p-8 md:p-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl border border-gray-200/60 animate-fade-in">

        {/* Floating Logo with Gentle Pulse */}
        <div className="relative">
          <img
            src={LogoImg}
            alt="Loading..."
            className="w-24 h-24 md:w-32 md:h-32 object-contain animate-floating"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))' }}
          />
          {/* Subtle pulsing ring behind logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full border-2 border-blue-500/30 animate-ping-slow"></div>
          </div>
        </div>

        {/* AI-Style Typing Text with Floating Dots */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-gray-700 font-medium text-lg md:text-xl tracking-wide">
            Preparing your experience
          </h3>
          <div className="flex space-x-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
          <p className="text-gray-500 text-sm md:text-base font-light max-w-xs">
            Optimizing performance... just a moment.
          </p>
        </div>

      </div>

      {/* Global Styles for Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-floating {
          animation: floating 3s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-bounce {
          animation: bounce 0.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProfessionalLoading;