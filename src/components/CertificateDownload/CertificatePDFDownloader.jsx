import React, { useRef,useState } from "react";
import { Award, Shield} from "lucide-react";
import { TechLogos } from "../CertificateViewer/techIcons";
import signImg from "../../assets/sign/sign.png"
import LogoImg from "../../assets/sign/sfLogo.png"

// ---------------- Logo Component ----------------
const ShaikhTechLogo = () => (
  <div className="flex items-center justify-center space-x-4 mb-6">
    <div className="text-center">
      <h1 className="text-4xl font-black mb-1">
        <span className="text-black">shekh</span>
        <span className="text-green-500">tech</span>
      </h1>
      <div className="w-24 h-0.5 bg-green-500 mx-auto"></div>
    </div>
  </div>
);

// ---------------- Decorative Background Component ----------------
const DecorativeElements = () => (
  <>
     <div className="absolute inset-0 opacity-8">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path d="M20 20h60v60h-60z" fill="none" stroke="#0ea5e9" strokeWidth="0.5" />
            <circle cx="20" cy="20" r="2" fill="#0ea5e9" />
            <circle cx="80" cy="20" r="2" fill="#0ea5e9" />
            <circle cx="20" cy="80" r="2" fill="#0ea5e9" />
            <circle cx="80" cy="80" r="2" fill="#0ea5e9" />
            <path d="M40 10v20m20 0v20m-20 20v20m20 0v20" stroke="#0ea5e9" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>

    {/* Corner decorative elements */}
    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-cyan-500 opacity-40 sm:w-24 sm:h-24"></div>
    <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-cyan-500 opacity-40 sm:w-24 sm:h-24"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-cyan-500 opacity-40 sm:w-24 sm:h-24"></div>
    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-cyan-500 opacity-40 sm:w-24 sm:h-24"></div>
  </>
);

// ---------------- Enhanced Signature Component ----------------
const SignatureSVG = () => (
  <div className="signature-container">
    <img 
      src={signImg} 
      alt="Director's Signature" 
      className="mx-auto h-26 w-26 max-w-[120px] object-contain filter contrast-125 brightness-90 mb-[-2rem]"
      style={{
        mixBlendMode: 'multiply',
        filter: 'contrast(1.2) brightness(0.8) saturate(1.1)',
      }}
    />
  </div>
);

// ---------------- Main Certificate Component ----------------
export default function CertificatePDFDownloader({
  name = "Shekh Tech",
  courseTitle = "Full Stack Web Development",
  score = 10,
  total = 10,
  percentage = 100,
  date = "30th june 2025",
  certificateNumber = "ST20252110",
}) {
  const certificateRef = useRef();
    const [showScanner, setShowScanner] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);
  
    const certificateData = {
      name,
      courseTitle,
      score,
      total,
      percentage,
      date,
      certificateNumber
    };

  const certRef = React.useRef();
  
  return (
    <div className="text-center p-6">
      {/* Certificate Container - Exact Styling Match */}
      <div
        ref={certRef}
        id="certificate"
        className="w-full max-w-4xl mx-auto min-h-[700px] bg-white relative overflow-hidden border-8 border-cyan-500 shadow-2xl"
        role="img"
        aria-label={`Certificate of Achievement for ${name}`}
      >
        {/* Decorative Background */}
        <DecorativeElements />
        
        {/* Inner Border */}
        <div className="absolute inset-3 border-2 border-cyan-400 rounded-sm"></div>
        
        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col h-full justify-between p-8">
          {/* Header Section */}
          <div className="text-center">
            <ShaikhTechLogo />
            <div className="mt-4 space-y-2">
              <h1
                className="text-3xl font-bold text-gray-600 tracking-wider"
                style={{ fontFamily: "serif" }}
              >
                Certificate of Achievement
              </h1>
              <p className="text-base text-gray-600 font-semibold">Congratulations!</p>
            </div>
          </div>
          
          {/* Main Content Section */}
          <div className="text-center flex-grow flex flex-col justify-center space-y-4 py-4">
            {/* Name Section */}
            <div>
              <h3 className="text-4xl font-bold text-cyan-600">{name}</h3>
              <div className="w-48 h-0.5 bg-gray-400 mx-auto mt-2"></div>
            </div>
            
            <p className="text-base text-gray-700">
              You have successfully completed our quiz competition
            </p>
            
            {/* Course Title */}
            <h4 className="text-2xl font-bold text-black">{courseTitle}</h4>
            
            {/* Technology Icons */}
            <TechLogos courseTitle={courseTitle} />
            
            {/* Achievement Badge */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg border-2 border-orange-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -inset-1 border-2 border-dashed border-orange-300 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Score Display */}
            <div className="bg-gray-50 rounded-lg p-4 max-w-xs mx-auto border border-gray-200">
              <p className="text-lg font-bold text-gray-800">
                Score: {score}/{total} ({percentage}%)
              </p>
              <p className="text-sm text-gray-600">Excellent Performance!</p>
            </div>
          </div>
          
          {/* Footer Section */}
          <div className="grid grid-cols-3 gap-6 items-end mt-6">
            {/* Date */}
            <div className="text-left">
              <p className="text-sm text-gray-500">Date:</p>
              <p className="text-base font-bold text-gray-800">{date}</p>        
            </div>
            
            {/* Enhanced Signature Section */}
            <div className="text-center">
              <div className="mb-3">
                <SignatureSVG />
              </div>
              <div className="w-32 h-0.5 bg-gray-400 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600 font-bold">ShaikhTech Academy</p>
              <p className="text-xs text-gray-500">Program Director</p>
            </div>
            
            {/* Certificate Number */}
            <div className="text-right">
              <p className="text-sm text-gray-500">Certificate No:</p>
              <p className="text-base font-bold text-gray-800 font-mono">{certificateNumber}</p>
            </div>
          </div>
        </div>
        
        {/* Verification Badge */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
            <Shield className="w-4 h-4" />
          </div>
          <img 
            src={LogoImg} 
            className="w-12 h-12 rounded-full shadow-lg" 
            style={{ userSelect: 'none', pointerEvents: 'none' }}
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            alt="ShaikhTech Security"
          />
        </div>
      </div>

      {/* Custom CSS for additional signature styling */}
      <style jsx>{`
        .signature-container {
          position: relative;
          padding: 4px 0;
        }
        
        .signature-image {
          transition: all 0.2s ease;
          border-radius: 2px;
        }
        
        .signature-image:hover {
          transform: scale(1.02);
        }
        
        /* Print-friendly styles */
        @media print {
          .signature-image {
            filter: contrast(1.4) brightness(0.7) !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
        
        /* High DPI display optimization */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .signature-image {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
        }
      `}</style>
    </div>
  );
}
