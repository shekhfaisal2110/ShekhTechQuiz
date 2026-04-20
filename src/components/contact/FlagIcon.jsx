// src/components/FlagIcon.jsx
import React, { useState } from 'react';

const FlagIcon = ({ countryCode, size = 20, className = "" }) => {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fallback emoji flags mapping
  const emojiFlags = {
    'IN': '🇮🇳', 'US': '🇺🇸', 'GB': '🇬🇧', 'CA': '🇨🇦', 'AU': '🇦🇺',
    'DE': '🇩🇪', 'FR': '🇫🇷', 'IT': '🇮🇹', 'ES': '🇪🇸', 'NL': '🇳🇱',
    'CH': '🇨🇭', 'AT': '🇦🇹', 'BE': '🇧🇪', 'SE': '🇸🇪', 'NO': '🇳🇴',
    'DK': '🇩🇰', 'FI': '🇫🇮', 'PL': '🇵🇱', 'CZ': '🇨🇿', 'HU': '🇭🇺',
    'PT': '🇵🇹', 'GR': '🇬🇷', 'IE': '🇮🇪', 'CN': '🇨🇳', 'JP': '🇯🇵',
    'KR': '🇰🇷', 'SG': '🇸🇬', 'MY': '🇲🇾', 'TH': '🇹🇭', 'VN': '🇻🇳',
    'ID': '🇮🇩', 'PH': '🇵🇭', 'BD': '🇧🇩', 'PK': '🇵🇰', 'LK': '🇱🇰',
    'NP': '🇳🇵', 'AE': '🇦🇪', 'SA': '🇸🇦', 'QA': '🇶🇦', 'KW': '🇰🇼',
    'BH': '🇧🇭', 'OM': '🇴🇲', 'JO': '🇯🇴', 'IL': '🇮🇱', 'TR': '🇹🇷',
    'RU': '🇷🇺', 'BR': '🇧🇷', 'MX': '🇲🇽', 'AR': '🇦🇷', 'CL': '🇨🇱',
    'CO': '🇨🇴', 'PE': '🇵🇪', 'ZA': '🇿🇦', 'NG': '🇳🇬', 'KE': '🇰🇪',
    'EG': '🇪🇬', 'MA': '🇲🇦', 'NZ': '🇳🇿', 'HK': '🇭🇰', 'TW': '🇹🇼'
  };

  const flagUrl = `https://flagcdn.com/${size}x${Math.round(size * 0.75)}/${countryCode.toLowerCase()}.png`;

  if (imageError || !countryCode) {
    return (
      <span 
        className={`inline-block text-${size <= 16 ? 'sm' : 'base'} ${className}`}
        style={{ fontSize: `${size}px`, lineHeight: 1 }}
      >
        {emojiFlags[countryCode] || '🏳️'}
      </span>
    );
  }

  return (
    <img
      src={flagUrl}
      alt={`${countryCode} flag`}
      className={`inline-block rounded-sm ${className}`}
      style={{ 
        width: `${size}px`, 
        height: `${Math.round(size * 0.75)}px`,
        objectFit: 'cover'
      }}
      onLoad={() => setLoading(false)}
      onError={() => {
        setImageError(true);
        setLoading(false);
      }}
    />
  );
};

export default FlagIcon;