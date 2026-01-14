import React from 'react';
import Image from 'next/image';

export default function ZentiqLogo({ className }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <Image 
        src="/icon.png" 
        alt="Zentiq Logo" 
        width={100} 
        height={100}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}