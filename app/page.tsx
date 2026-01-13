"use client";

import React from 'react';
import { Shield, Globe, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ZentiqLogo from '../components/ZentiqLogo';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <div className="min-h-screen bg-zentiq-dark text-zentiq-slate selection:bg-zentiq-teal selection:text-zentiq-dark">
      
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-zentiq-dark/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            {/* LOGO CORRIGIDO AQUI: Usa classes do Tailwind para tamanho (w-10 h-10) */}
            <div className="w-10 h-10">
                <ZentiqLogo className="w-full h-full group-hover:rotate-180 transition-transform duration-700" />
            </div>
            <span className="font-bold text-xl text-zentiq-white tracking-wider">ZENTIQ</span>
          </div>
          <div className="hidden md:block">
  <ConnectButton 
    label="Connect Wallet" 
    accountStatus="address" 
    chainStatus="icon"
  />
</div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-zentiq-teal font-medium tracking-widest mb-4">PRIVACY PROTOCOL</h2>
            <h1 className="text-5xl md:text-7xl font-bold text-zentiq-white mb-6 leading-tight">
              Silence is <br/> Intelligence.
            </h1>
            <p className="text-lg md:text-xl text-zentiq-slate mb-10 max-w-2xl mx-auto leading-relaxed">
              The first privacy protocol designed for global business operations. 
              Shield your transaction data without sacrificing compliance.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-zentiq-teal text-zentiq-dark font-bold rounded text-lg hover:bg-opacity-90 transition-all flex items-center gap-2">
                Launch App <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 text-zentiq-white border border-zentiq-slate/30 rounded text-lg hover:border-zentiq-teal transition-all">
                Read Documentation
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mt-32 grid md:grid-cols-3 gap-8">
          {[
            { icon: <Shield className="w-8 h-8 text-zentiq-teal" />, title: "Shielded Pools", desc: "Enterprise-grade encryption for transaction data." },
            { icon: <Globe className="w-8 h-8 text-zentiq-teal" />, title: "Global Compliance", desc: "Built-in view keys for regulatory auditing." },
            { icon: <Lock className="w-8 h-8 text-zentiq-teal" />, title: "Instant Settlement", desc: "Privacy that doesn't slow down business." }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="p-8 bg-[#112240] rounded hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-zentiq-white mb-2">{feature.title}</h3>
              <p className="text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}