import React from 'react';
import Image from 'next/image';

export default function ZentiqLogo({ className }: { className?: string }) {
  // Certifique-se de que o arquivo "icon.png" está na pasta "public"
  return (
    <div className={`relative ${className}`}>
      <Image 
        src="/icon.png" 
        alt="Zentiq Logo" 
        fill 
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain"
        priority
      />
    </div>
  );
}