const DecorativeElements = () => (
  <>
    {/* Circuit pattern background */}
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
export default DecorativeElements;