import React from 'react';
import { useTranslations } from 'next-intl';
import { Shield, Globe, Lock, ArrowRight } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link'; // <--- 1. Importei o Link aqui
import ZentiqLogo from '@/components/ZentiqLogo';

export default function Home() {
  const tNavbar = useTranslations('Navbar');
  const tHero = useTranslations('Hero');
  const tFeatures = useTranslations('Features');

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#8892b0] selection:bg-[#64ffda] selection:text-[#0a192f]">
      
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-[#0a192f]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10">
                <ZentiqLogo className="w-full h-full group-hover:rotate-180 transition-transform duration-700" />
            </div>
            <span className="font-bold text-xl text-[#e6f1ff] tracking-wider">ZENTIQ</span>
          </div>
          <div className="hidden md:block">
            <ConnectButton label={tNavbar('connectWallet')} accountStatus="address" chainStatus="icon" showBalance={false} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center mt-20">
          <div>
            <h2 className="text-[#64ffda] font-medium tracking-widest mb-4">{tHero('label')}</h2>
            <h1 className="text-5xl md:text-7xl font-bold text-[#e6f1ff] mb-6 leading-tight">
              {tHero.rich('title', { br: () => <br /> })}
            </h1>
            <p className="text-lg md:text-xl text-[#8892b0] mb-10 max-w-2xl mx-auto leading-relaxed">
              {tHero('subtitle')}
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              
              {/* 2. O LINK FOI ADICIONADO AQUI NO BOTÃO "LAUNCH APP" */}
              <Link href="/dashboard">
                <button className="px-8 py-4 bg-[#64ffda] text-[#0a192f] font-bold rounded text-lg hover:bg-opacity-90 transition-all flex items-center gap-2">
                    {tHero('launchApp')} <ArrowRight size={20} />
                </button>
              </Link>

              <button className="px-8 py-4 text-[#e6f1ff] border border-[#8892b0]/30 rounded text-lg hover:border-[#64ffda] transition-all">
                {tHero('docs')}
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-6xl mx-auto mt-32 grid md:grid-cols-3 gap-8">
          {[
            { icon: <Shield className="w-8 h-8 text-[#64ffda]" />, title: tFeatures('shieldTitle'), desc: tFeatures('shieldDesc') },
            { icon: <Globe className="w-8 h-8 text-[#64ffda]" />, title: tFeatures('globalTitle'), desc: tFeatures('globalDesc') },
            { icon: <Lock className="w-8 h-8 text-[#64ffda]" />, title: tFeatures('lockTitle'), desc: tFeatures('lockDesc') }
          ].map((feature, index) => (
            <div key={index} className="p-8 bg-[#112240] rounded hover:-translate-y-2 transition-transform duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-[#e6f1ff] mb-2">{feature.title}</h3>
              <p className="text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}