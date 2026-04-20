import signImg from "../../assets/sign/sign.png";
const SignatureSVG = () => (
  <div className="signature-container">
    <img 
      src={signImg} 
      alt="Director's Signature" 
      className="mx-auto h-26 w-26 max-w-[120px] object-contain filter contrast-125 brightness-90 mb-[-2rem]"
      style={{
        mixBlendMode: 'multiply',
        filter: 'contrast(1.2) brightness(0.8) saturate(1.1)',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
      onDragStart={(e) => e.preventDefault()}
    />
  </div>
);
export default SignatureSVG;