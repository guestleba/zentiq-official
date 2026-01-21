"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  Activity, 
  History
} from 'lucide-react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { parseEther, formatEther } from 'viem';
import Link from 'next/link';
import Image from 'next/image';

// ✅ CORREÇÃO: Apontando para a pasta CONFIG agora
import { contractABI, contractAddress } from '@/config/contracts';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

  // 1. Ler Saldo do Contrato
  const { data: balanceData, refetch } = useReadContract({
    address: contractAddress as `0x${string}`, 
    abi: contractABI,                          
    functionName: 'getBalance',
    account: address,
  });

  // 2. Preparar Escrita
  const { data: hash, writeContract, isPending } = useWriteContract();
  
  // 3. Esperar Confirmação
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ 
    hash 
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setAmount('');
    }
  }, [isSuccess, refetch]);

  const handleTransaction = () => {
    if (!amount) return;
    
    try {
        if (activeTab === 'deposit') {
          writeContract({
            address: contractAddress as `0x${string}`,
            abi: contractABI,
            functionName: 'deposit',
            value: parseEther(amount),
          });
        } else {
          writeContract({
            address: contractAddress as `0x${string}`,
            abi: contractABI,
            functionName: 'withdraw',
            args: [parseEther(amount)],
          });
        }
    } catch (error) {
        console.error("Erro na transação:", error);
    }
  };

  // TELA DE BLOQUEIO (Não conectado)
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 mb-8 relative animate-pulse">
           <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl"></div>
           <Image 
             src="/icon.png" 
             alt="Zentiq" 
             fill 
             className="object-contain drop-shadow-[0_0_20px_rgba(100,255,218,0.5)]" 
             priority
           />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Access Required</h1>
        <p className="text-slate-400 mb-8 max-w-md">Connect your wallet to access the Zentiq Vault secure interface.</p>
        <div className="scale-125">
            <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-slate-100 selection:bg-[#64ffda] selection:text-[#0a192f]">
      
      {/* NAVBAR */}
      <nav className="border-b border-white/5 bg-[#0a192f]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 relative">
                <Image src="/icon.png" alt="Logo" fill className="object-contain" />
            </div>
            <span className="font-bold tracking-wider hidden sm:block text-white">VAULT TERMINAL</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#64ffda] bg-[#64ffda]/10 px-3 py-1 rounded-full border border-[#64ffda]/20">
                <span className="w-2 h-2 rounded-full bg-[#64ffda] animate-pulse" />
                SEPOLIA
            </div>
            <ConnectButton accountStatus="avatar" chainStatus="none" showBalance={false} />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 pt-12">
        
        {/* HEADER */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6"
        >
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Welcome back.
                </h1>
                <p className="text-slate-400">Encrypted vault overview for {address?.slice(0,6)}...{address?.slice(-4)}</p>
            </div>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">
            
            {/* SALDO */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="md:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden group border border-white/10 bg-white/5"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-white">
                    <ShieldCheck size={180} />
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-slate-400 mb-6 font-mono text-sm uppercase tracking-widest">
                        <Wallet size={16} /> Total Vault Balance
                    </div>
                    
                    <div className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight font-mono">
                        {balanceData ? parseFloat(formatEther(balanceData as bigint)).toFixed(4) : '0.0000'} 
                        <span className="text-2xl text-[#64ffda] ml-2">ETH</span>
                    </div>
                </div>
            </motion.div>

            {/* OPERAÇÕES */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-6 rounded-3xl border border-[#64ffda]/20 bg-[#112240]/50"
            >
                <div className="flex p-1 bg-[#0a192f] rounded-xl mb-6">
                    <button 
                        onClick={() => setActiveTab('deposit')}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'deposit' ? 'bg-[#64ffda] text-[#0a192f]' : 'text-slate-400 hover:text-white'}`}
                    >
                        <ArrowDownLeft size={16} /> Deposit
                    </button>
                    <button 
                        onClick={() => setActiveTab('withdraw')}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'withdraw' ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        <ArrowUpRight size={16} /> Withdraw
                    </button>
                </div>

                <div className="mb-6">
                    <label className="text-xs text-slate-400 mb-2 block ml-1">AMOUNT (ETH)</label>
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-[#0a192f]/50 border border-white/10 rounded-xl px-4 py-4 text-2xl text-white outline-none focus:border-[#64ffda] transition-colors font-mono"
                    />
                </div>

                <button 
                    disabled={isPending || isConfirming || !amount}
                    onClick={handleTransaction}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2
                        ${isPending || isConfirming 
                            ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
                            : activeTab === 'deposit' 
                                ? 'bg-[#64ffda] text-[#0a192f] hover:bg-[#4cdbb9]' 
                                : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                >
                    {isPending || isConfirming ? <span className="animate-pulse">Processing...</span> : (activeTab === 'deposit' ? 'Confirm Deposit' : 'Confirm Withdraw')}
                </button>
                
                {isSuccess && (
                    <div className="mt-4 text-center text-green-400 text-sm">Success! Balance updated.</div>
                )}
            </motion.div>
        </div>
      </main>
    </div>
  );
}