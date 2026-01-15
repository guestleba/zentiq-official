import React from 'react';

export default function ZentiqLogo({ className }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center text-[#64ffda]`}>
      {/* SVG desenhado via código - não precisa de arquivo de imagem */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_10px_rgba(100,255,218,0.5)]"
      >
        {/* O Escudo */}
        <path 
          d="M50 5 L85 20 V45 C85 65 70 85 50 95 C30 85 15 65 15 45 V20 L50 5 Z" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* O "Z" Estilizado */}
        <path 
          d="M35 35 H65 L35 65 H65" 
          stroke="currentColor" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Detalhe do Cadeado (Arco) */}
        <path 
          d="M50 5 V20" 
          stroke="currentColor" 
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}