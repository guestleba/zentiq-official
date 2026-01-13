"use client";

import React, { useState } from 'react';
import { useAccount, useBalance, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { Wallet, ArrowDownLeft, ShieldCheck, AlertCircle, Lock, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });
  
  // Estados para controlar o formulário de transação
  const [amount, setAmount] = useState('');
  const { sendTransaction, isPending } = useSendTransaction();

  // Função para simular a Blindagem (Envia para o próprio endereço por segurança no teste)
  const handleShield = () => {
    if (!amount || !address) return;
    
    try {
      sendTransaction({ 
        to: address, // Enviando para si mesmo apenas para testar o popup da carteira
        value: parseEther(amount) 
      });
    } catch (error) {
      console.error("Erro na transação:", error);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#e6f1ff]">Dashboard</h1>
          <p className="text-[#8892b0]">
              {isConnected 
                ? `Welcome back, Commander.`
                : "System Standby. Connect wallet."}
          </p>
        </div>
        {isConnected && (
            <div className="px-4 py-2 bg-[#64ffda]/10 border border-[#64ffda]/20 rounded-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-[#64ffda] rounded-full animate-pulse"></div>
                <span className="text-[#64ffda] text-sm font-mono">ENCRYPTED CONNECTION</span>
            </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA DA ESQUERDA: Status e Saldo */}
        <div className="lg:col-span-2 space-y-6">
            {/* Cards de Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#112240] p-6 rounded-xl border border-white/5 glow-effect">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-[#64ffda]/10 rounded-lg">
                        <Wallet className="text-[#64ffda] w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-[#8892b0] text-sm mb-1">Available Balance</h3>
                    <p className="text-3xl font-bold text-[#e6f1ff]">
                        {isConnected && balanceData 
                            ? `${parseFloat(balanceData.formatted).toFixed(4)} ${balanceData.symbol}`
                            : "---"}
                    </p>
                </div>

                <div className="bg-[#112240] p-6 rounded-xl border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-500/10 rounded-lg">
                        <ShieldCheck className="text-green-400 w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-[#8892b0] text-sm mb-1">Privacy Set</h3>
                    <p className="text-3xl font-bold text-[#e6f1ff]">Strong</p>
                </div>
            </div>

            {/* Histórico Vazio */}
            <div className="bg-[#112240] rounded-xl border border-white/5 overflow-hidden min-h-[300px]">
                <div className="p-6 border-b border-white/5">
                    <h3 className="text-xl font-bold text-[#e6f1ff]">Recent Transactions</h3>
                </div>
                <div className="p-12 text-center text-[#8892b0] flex flex-col items-center justify-center h-full">
                    <ShieldCheck className="w-12 h-12 mb-4 opacity-20" />
                    <p>No shielded activity detected in this epoch.</p>
                </div>
            </div>
        </div>

        {/* COLUNA DA DIREITA: Ação de Blindar (Transação) */}
        <div className="lg:col-span-1">
            <div className="bg-[#112240] p-6 rounded-xl border border-[#64ffda]/20 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#64ffda] rounded text-[#0a192f]">
                        <Lock size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-[#e6f1ff]">Shield Assets</h2>
                </div>

                <p className="text-sm text-[#8892b0] mb-6">
                    Transfer assets from your public wallet to the shielded pool.
                </p>

                {/* Formulário */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-[#8892b0] uppercase font-bold ml-1">Amount to Shield</label>
                        <div className="relative mt-2">
                            <input 
                                type="number" 
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                disabled={!isConnected}
                                className="w-full bg-[#0a192f] border border-white/10 rounded-lg p-4 text-[#e6f1ff] focus:border-[#64ffda] focus:outline-none transition-colors"
                            />
                            <span className="absolute right-4 top-4 text-[#8892b0] font-bold">ETH</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleShield}
                        disabled={!isConnected || !amount || isPending}
                        className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                            !isConnected 
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                : 'bg-[#64ffda] text-[#0a192f] hover:bg-opacity-90 hover:scale-[1.02]'
                        }`}
                    >
                        {isPending ? 'Processing...' : 'Shield Now'} 
                        {!isPending && <ArrowRight size={18} />}
                    </button>

                    {!isConnected && (
                        <div className="flex items-center gap-2 text-yellow-500 text-xs bg-yellow-500/10 p-3 rounded">
                            <AlertCircle size={14} />
                            Wallet not connected
                        </div>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}