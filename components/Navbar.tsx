import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Removi o Shield pois vamos usar sua imagem
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const navLinks = [
  { name: "Protocol", href: "#protocol" },
  { name: "Features", href: "#features" },
  { name: "Docs", href: "#docs" },
  { name: "Governance", href: "#governance" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl"
    >
      <div className="glass-panel px-6 py-4 flex items-center justify-between rounded-2xl">
        
        {/* --- 1. SEU LOGO OFICIAL --- */}
        <Link href="/" passHref>
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-10 h-10">
              <Image 
                src="/icon.png" 
                alt="Zentiq Logo" 
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(100,255,218,0.6)]"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Zentiq</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-slate-300 hover:text-[#64ffda] transition-colors duration-200 text-sm font-medium"
              whileHover={{ y: -2 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* --- 2. BOTÃO DE CARTEIRA REAL (Desktop) --- */}
        <div className="hidden md:block">
            {/* Usamos o Custom Button do RainbowKit ou o padrão. 
                Aqui vou usar o padrão ajustado para não quebrar o layout */}
            <div className="scale-90 origin-right">
                <ConnectButton 
                    label="Connect Wallet" 
                    accountStatus="address" 
                    chainStatus="icon" 
                    showBalance={false} 
                />
            </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="glass-panel mt-2 p-6 md:hidden rounded-xl border border-white/10 bg-[#0a192f]/95 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-[#64ffda] transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            {/* --- 3. BOTÃO DE CARTEIRA REAL (Mobile) --- */}
            <div className="mt-4 flex justify-center">
                <ConnectButton label="Connect Wallet" showBalance={false} />
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};