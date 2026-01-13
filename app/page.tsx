'use client';

import React from 'react';
import { Shield, Globe, Lock, ArrowRight, Wallet, Hexagon } from 'lucide-react';
import { motion } from 'framer-motion';
import ZentiqLogo from '../components/ZentiqLogo'; // Reusing your existing logo component

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-zentiq-navy text-zentiq-slate selection:bg-zentiq-teal/20 selection:text-zentiq-teal font-sans">
      {/* 1. Navbar */}
      <nav className="fixed w-full top-0 z-50 backdrop-blur-md bg-zentiq-navy/90 border-b border-zentiq-lightNavy h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group">
             {/* Using the SVG Logo you requested previously, or fallback to text if needed */}
            <ZentiqLogo size={32} className="group-hover:rotate-180 transition-transform duration-700" />
            <span className="font-bold text-xl text-zentiq-white tracking-wider font-sans">
              ZENTIQ
            </span>
          </div>

          <button className="flex items-center gap-2 px-6 py-2 border border-zentiq-teal text-zentiq-teal rounded font-medium text-sm hover:bg-zentiq-teal/10 transition-colors duration-300">
            <Wallet size={16} />
            <span>Connect Wallet</span>
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        {/* 2. Hero Section */}
        <section className="max-w-7xl mx-auto flex flex-col items-center text-center mb-32 relative">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zentiq-teal/5 via-zentiq-navy to-zentiq-navy pointer-events-none" />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="mb-6 inline-block">
               <span className="px-3 py-1 rounded-full border border-zentiq-teal/30 text-zentiq-teal text-xs font-mono bg-zentiq-teal/5">
                 PROTOCOL V1.0 LIVE
               </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-5xl md:text-7xl font-bold text-zentiq-white leading-tight mb-6 tracking-tight"
            >
              Silence is <span className="text-zentiq-teal">Intelligence.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-zentiq-slate mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              The first privacy protocol designed specifically for global business operations. 
              Protect your payroll, supply chain, and assets on-chain.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-zentiq-teal text-zentiq-navy font-bold rounded hover:bg-opacity-90 transition-all shadow-[0_0_30px_rgba(100,255,218,0.3)] btn-teal-hover flex items-center gap-2">
                Launch App
                <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 border border-zentiq-slate/30 text-zentiq-white rounded hover:bg-zentiq-slate/5 transition-all">
                Read Whitepaper
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* 3. Features Grid */}
        <section className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <div className="p-8 bg-zentiq-lightNavy/50 border border-zentiq-lightNavy rounded-xl hover:border-zentiq-teal/30 transition-colors group">
              <div className="w-12 h-12 bg-zentiq-navy rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="text-zentiq-teal" size={24} />
              </div>
              <h3 className="text-xl font-bold text-zentiq-white mb-3">Shielded Pools</h3>
              <p className="text-sm leading-relaxed text-zentiq-slate/80">
                Utilizing zk-SNARKs to enable completely private transactions. Your business balance sheet remains confidential.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-zentiq-lightNavy/50 border border-zentiq-lightNavy rounded-xl hover:border-zentiq-teal/30 transition-colors group">
              <div className="w-12 h-12 bg-zentiq-navy rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="text-zentiq-teal" size={24} />
              </div>
              <h3 className="text-xl font-bold text-zentiq-white mb-3">Global Compliance</h3>
              <p className="text-sm leading-relaxed text-zentiq-slate/80">
                Built-in view keys for auditors. Remain compliant with local regulations without exposing data to the public.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-zentiq-lightNavy/50 border border-zentiq-lightNavy rounded-xl hover:border-zentiq-teal/30 transition-colors group">
              <div className="w-12 h-12 bg-zentiq-navy rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="text-zentiq-teal" size={24} />
              </div>
              <h3 className="text-xl font-bold text-zentiq-white mb-3">Instant Settlement</h3>
              <p className="text-sm leading-relaxed text-zentiq-slate/80">
                Finality in seconds. Pay international suppliers and employees instantly with zero volatility risk.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}