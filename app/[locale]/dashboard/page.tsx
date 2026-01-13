"use client";

import React from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Wallet, ArrowDownLeft, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  // 1. Pegamos os dados da carteira conectada
  const { address, isConnected } = useAccount();
  
  // 2. Pegamos o saldo dessa carteira
  const { data: balanceData } = useBalance({
    address: address,
  });

  return (
    <div className="p-8">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-[#e6f1ff]">Dashboard</h1>
        <p className="text-[#8892b0]">
            {isConnected 
              ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}`
              : "Welcome. Please connect your wallet."}
        </p>
      </header>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* CARD 1: SALDO REAL (Agora funciona!) */}
        <div className="bg-[#112240] p-6 rounded-xl border border-white/5 glow-effect">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#64ffda]/10 rounded-lg">
              <Wallet className="text-[#64ffda] w-6 h-6" />
            </div>
            {isConnected && (
                <span className="text-[#64ffda] text-xs font-bold px-2 py-1 bg-[#64ffda]/10 rounded">LIVE</span>
            )}
          </div>
          <h3 className="text-[#8892b0] text-sm mb-1">Wallet Balance</h3>
          <p className="text-3xl font-bold text-[#e6f1ff]">
            {isConnected && balanceData 
                ? `${parseFloat(balanceData.formatted).toFixed(4)} ${balanceData.symbol}`
                : "---"}
          </p>
        </div>

        {/* CARD 2: Inflow (Simulado por enquanto) */}
        <div className="bg-[#112240] p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <ArrowDownLeft className="text-blue-400 w-6 h-6" />
            </div>
          </div>
          <h3 className="text-[#8892b0] text-sm mb-1">Shielded Volume</h3>
          <p className="text-3xl font-bold text-[#e6f1ff]">0.00 ETH</p>
        </div>

        {/* CARD 3: Status */}
        <div className="bg-[#112240] p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <ShieldCheck className="text-green-400 w-6 h-6" />
            </div>
            <span className="text-green-400 text-xs font-bold px-2 py-1 bg-green-400/10 rounded">SAFE</span>
          </div>
          <h3 className="text-[#8892b0] text-sm mb-1">Privacy Level</h3>
          <p className="text-3xl font-bold text-[#e6f1ff]">Maximum</p>
        </div>
      </div>

      {/* Área de Transações */}
      <div className="bg-[#112240] rounded-xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#e6f1ff]">Shielded Transactions</h3>
        </div>
        
        <div className="p-12 text-center text-[#8892b0] flex flex-col items-center justify-center">
            {isConnected ? (
                <>
                    <ShieldCheck className="w-12 h-12 mb-4 opacity-20" />
                    <p>Your history is encrypted. No visible transactions.</p>
                </>
            ) : (
                <>
                    <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
                    <p>Connect wallet to view private data.</p>
                </>
            )}
        </div>
      </div>
    </div>
  );
}