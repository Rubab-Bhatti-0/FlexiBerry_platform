import React from 'react';

interface FlexiBerryLogoProps {
  size?: number;
  className?: string;
}

export const FlexiBerryLogo = ({ size = 40, className = '' }: FlexiBerryLogoProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="sLogoGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#8b5cf6"/>
      </linearGradient>
      <linearGradient id="sLogoSheen" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.22"/>
        <stop offset="100%" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      <filter id="sLogoShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#3b82f6" floodOpacity="0.5"/>
      </filter>
    </defs>
    <g filter="url(#sLogoShadow)">
      <rect width="100" height="100" rx="26" fill="url(#sLogoGrad)"/>
      <rect width="100" height="100" rx="26" fill="url(#sLogoSheen)"/>
    </g>
    <g transform="rotate(-14, 50, 52)">
      <path d="M 8 20 L 17 20 L 23 40" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M 23 40 L 23 70 Q 23 76 29 76 L 79 76 Q 85 76 85 70 L 85 40 Q 85 34 79 34 L 35 34 Q 27 34 23 40 Z" fill="white"/>
      <circle cx="32" cy="39" r="4.5" fill="url(#sLogoGrad)"/>
      <rect x="30" y="45" width="5" height="21" rx="2.5" fill="url(#sLogoGrad)"/>
      <rect x="30" y="45" width="13" height="4.5" rx="2.25" fill="url(#sLogoGrad)"/>
      <rect x="30" y="53.5" width="10" height="4" rx="2" fill="url(#sLogoGrad)"/>
      <rect x="48" y="45" width="5" height="21" rx="2.5" fill="url(#sLogoGrad)"/>
      <path d="M 53 45 Q 65 45 65 51.5 Q 65 57.5 53 57.5" stroke="url(#sLogoGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M 53 57.8 Q 67 57.8 67 64.5 Q 67 71 53 71" stroke="url(#sLogoGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="35" cy="86" r="7.5" fill="white"/>
      <circle cx="35" cy="86" r="3.8" fill="url(#sLogoGrad)"/>
      <circle cx="35" cy="86" r="1.5" fill="white"/>
      <circle cx="70" cy="86" r="7.5" fill="#10b981"/>
      <circle cx="70" cy="86" r="3.8" fill="white"/>
      <circle cx="70" cy="86" r="1.5" fill="#10b981"/>
      <circle cx="43" cy="92" r="2.2" fill="white" opacity="0.7"/>
      <circle cx="52" cy="92" r="2.2" fill="white" opacity="0.4"/>
      <circle cx="61" cy="92" r="2.2" fill="white" opacity="0.18"/>
    </g>
    <rect width="100" height="100" rx="26" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.15"/>
  </svg>
);
