import React from 'react';

// Aceita apenas className para o Tailwind controlar o tamanho
export default function ZentiqLogo({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="96" fill="#0a192f" stroke="#233554" strokeWidth="4"/>
      <g>
        <path d="M65 60H120L135 85V115L120 140H80L65 115V85L80 60Z" fill="#0a192f" stroke="#64ffda" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M80 60L120 140" stroke="#64ffda" strokeWidth="3" strokeLinecap="round"/>
        <path d="M120 60L80 140" stroke="#64ffda" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="100" cy="100" r="10" fill="#64ffda"/>
      </g>
    </svg>
  );
}