export const countriesData = [
  { code: 'IN', name: 'India', phone: '+91', maxLength: 10 },
  { code: 'US', name: 'United States', phone: '+1', maxLength: 10 },
  { code: 'GB', name: 'United Kingdom', phone: '+44', maxLength: 11 },
  { code: 'CA', name: 'Canada', phone: '+1', maxLength: 10 },
  { code: 'AU', name: 'Australia', phone: '+61', maxLength: 9 },
  { code: 'DE', name: 'Germany', phone: '+49', maxLength: 12 },
  { code: 'FR', name: 'France', phone: '+33', maxLength: 10 },
  { code: 'IT', name: 'Italy', phone: '+39', maxLength: 10 },
  { code: 'ES', name: 'Spain', phone: '+34', maxLength: 9 },
  { code: 'NL', name: 'Netherlands', phone: '+31', maxLength: 9 },
  { code: 'CH', name: 'Switzerland', phone: '+41', maxLength: 9 },
  { code: 'AT', name: 'Austria', phone: '+43', maxLength: 11 },
  { code: 'BE', name: 'Belgium', phone: '+32', maxLength: 9 },
  { code: 'SE', name: 'Sweden', phone: '+46', maxLength: 9 },
  { code: 'NO', name: 'Norway', phone: '+47', maxLength: 8 },
  { code: 'DK', name: 'Denmark', phone: '+45', maxLength: 8 },
  { code: 'FI', name: 'Finland', phone: '+358', maxLength: 9 },
  { code: 'PL', name: 'Poland', phone: '+48', maxLength: 9 },
  { code: 'CZ', name: 'Czech Republic', phone: '+420', maxLength: 9 },
  { code: 'HU', name: 'Hungary', phone: '+36', maxLength: 9 },
  { code: 'PT', name: 'Portugal', phone: '+351', maxLength: 9 },
  { code: 'GR', name: 'Greece', phone: '+30', maxLength: 10 },
  { code: 'IE', name: 'Ireland', phone: '+353', maxLength: 9 },
  { code: 'CN', name: 'China', phone: '+86', maxLength: 11 },
  { code: 'JP', name: 'Japan', phone: '+81', maxLength: 11 },
  { code: 'KR', name: 'South Korea', phone: '+82', maxLength: 11 },
  { code: 'SG', name: 'Singapore', phone: '+65', maxLength: 8 },
  { code: 'MY', name: 'Malaysia', phone: '+60', maxLength: 10 },
  { code: 'TH', name: 'Thailand', phone: '+66', maxLength: 9 },
  { code: 'VN', name: 'Vietnam', phone: '+84', maxLength: 10 },
  { code: 'ID', name: 'Indonesia', phone: '+62', maxLength: 12 },
  { code: 'PH', name: 'Philippines', phone: '+63', maxLength: 10 },
  { code: 'BD', name: 'Bangladesh', phone: '+880', maxLength: 10 },
  { code: 'PK', name: 'Pakistan', phone: '+92', maxLength: 10 },
  { code: 'LK', name: 'Sri Lanka', phone: '+94', maxLength: 9 },
  { code: 'NP', name: 'Nepal', phone: '+977', maxLength: 10 },
  { code: 'AE', name: 'UAE', phone: '+971', maxLength: 9 },
  { code: 'SA', name: 'Saudi Arabia', phone: '+966', maxLength: 9 },
  { code: 'QA', name: 'Qatar', phone: '+974', maxLength: 8 },
  { code: 'KW', name: 'Kuwait', phone: '+965', maxLength: 8 },
  { code: 'BH', name: 'Bahrain', phone: '+973', maxLength: 8 },
  { code: 'OM', name: 'Oman', phone: '+968', maxLength: 8 },
  { code: 'JO', name: 'Jordan', phone: '+962', maxLength: 9 },
  { code: 'IL', name: 'Israel', phone: '+972', maxLength: 9 },
  { code: 'TR', name: 'Turkey', phone: '+90', maxLength: 10 },
  { code: 'RU', name: 'Russia', phone: '+7', maxLength: 10 },
  { code: 'BR', name: 'Brazil', phone: '+55', maxLength: 11 },
  { code: 'MX', name: 'Mexico', phone: '+52', maxLength: 10 },
  { code: 'AR', name: 'Argentina', phone: '+54', maxLength: 10 },
  { code: 'CL', name: 'Chile', phone: '+56', maxLength: 9 },
  { code: 'CO', name: 'Colombia', phone: '+57', maxLength: 10 },
  { code: 'PE', name: 'Peru', phone: '+51', maxLength: 9 },
  { code: 'ZA', name: 'South Africa', phone: '+27', maxLength: 9 },
  { code: 'NG', name: 'Nigeria', phone: '+234', maxLength: 10 },
  { code: 'KE', name: 'Kenya', phone: '+254', maxLength: 9 },
  { code: 'EG', name: 'Egypt', phone: '+20', maxLength: 10 },
  { code: 'MA', name: 'Morocco', phone: '+212', maxLength: 9 },
  { code: 'NZ', name: 'New Zealand', phone: '+64', maxLength: 9 },
  { code: 'HK', name: 'Hong Kong', phone: '+852', maxLength: 8 },
  { code: 'TW', name: 'Taiwan', phone: '+886', maxLength: 9 }
];



// Helper function to get country by phone code
export const getCountryByPhone = (phoneCode) => {
  return countriesData.find(country => country.phone === phoneCode);
};

// Helper function to get country by code
export const getCountryByCode = (countryCode) => {
  return countriesData.find(country => country.code === countryCode);
};

// Default country (India)
export const defaultCountry = { code: 'IN', name: 'India', phone: '+91', flag: '🇮🇳', maxLength: 10, currency: 'INR' };
