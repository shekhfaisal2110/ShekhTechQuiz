import React from 'react';
import { Shield } from 'lucide-react';
import LogoImg from '../../assets/sign/sfLogo.png';

export default function CertificateSecurityBadge() {
  return (
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
  );
}