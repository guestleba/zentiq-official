import React from 'react';
import { useTranslations } from 'next-intl';
import { Wallet, ArrowUpRight, ArrowDownLeft, ShieldCheck } from 'lucide-react';

export default function Dashboard() {
  // Vamos usar textos fixos por enquanto para testar, depois colocamos no dicionário
  return (
    <div className="p-8">
      {/* Header do Dashboard */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-[#e6f1ff]">Dashboard</h1>
        <p className="text-[#8892b0]">Welcome back to the shielded layer.</p>
      </header>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Card 1: Saldo Total */}
        <div className="bg-[#112240] p-6 rounded-xl border border-white/5 glow-effect">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#64ffda]/10 rounded-lg">
              <Wallet className="text-[#64ffda] w-6 h-6" />
            </div>
            <span className="text-[#64ffda] text-xs font-bold px-2 py-1 bg-[#64ffda]/10 rounded">+12.5%</span>
          </div>
          <h3 className="text-[#8892b0] text-sm mb-1">Total Shielded</h3>
          <p className="text-3xl font-bold text-[#e6f1ff]">$24,500.00</p>
        </div>

        {/* Card 2: Entrada */}
        <div className="bg-[#112240] p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <ArrowDownLeft className="text-blue-400 w-6 h-6" />
            </div>
          </div>
          <h3 className="text-[#8892b0] text-sm mb-1">Inflow (24h)</h3>
          <p className="text-3xl font-bold text-[#e6f1ff]">1.2 ETH</p>
        </div>

        {/* Card 3: Status da Privacidade */}
        <div className="bg-[#112240] p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <ShieldCheck className="text-green-400 w-6 h-6" />
            </div>
            <span className="text-green-400 text-xs font-bold px-2 py-1 bg-green-400/10 rounded">ACTIVE</span>
          </div>
          <h3 className="text-[#8892b0] text-sm mb-1">Anonymity Set</h3>
          <p className="text-3xl font-bold text-[#e6f1ff]">High</p>
        </div>
      </div>

      {/* Área de Transação Recente */}
      <div className="bg-[#112240] rounded-xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-xl font-bold text-[#e6f1ff]">Recent Activity</h3>
        </div>
        <div className="p-6 text-center text-[#8892b0] py-12">
          No transactions found in the shielded pool.
        </div>
      </div>
    </div>
  );
}