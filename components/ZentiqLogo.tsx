import React from 'react';

export default function ZentiqLogo({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="100%" 
      height="100%" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fundo Circular */}
      <circle cx="100" cy="100" r="96" fill="#0a192f" stroke="#233554" strokeWidth="4"/>
      
      {/* Elemento Z Abstrato */}
      <g>
        <path d="M65 60H120L135 85V115L120 140H80L65 115V85L80 60Z" fill="#0a192f" stroke="#64ffda" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M80 60L120 140" stroke="#64ffda" strokeWidth="3" strokeLinecap="round"/>
        <path d="M120 60L80 140" stroke="#64ffda" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="100" cy="100" r="10" fill="#64ffda"/>
        {/* Nós de conexão */}
        <circle cx="65" cy="85" r="4" fill="#ccd6f6"/>
        <circle cx="135" cy="115" r="4" fill="#ccd6f6"/>
        <circle cx="80" cy="140" r="4" fill="#ccd6f6"/>
        <circle cx="120" cy="60" r="4" fill="#ccd6f6"/>
      </g>
    </svg>
  );
}