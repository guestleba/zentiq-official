"use client";

import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { Wallet, ArrowDownLeft, ShieldCheck, Lock, ArrowRight, ArrowUpRight, Loader2, History } from 'lucide-react';
import { toast } from 'sonner';
import { VAULT_ADDRESS, VAULT_ABI } from '@/config/contracts';

type Transaction = {
  hash: string;
  type: 'deposit' | 'withdraw';
  amount: string;
  timestamp: string;
};

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { data: walletBalance } = useBalance({ address });

  // ESTADO: Alterna entre 'deposit' e 'withdraw'
  const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit');
  
  // Lê quanto VOCÊ tem blindado no contrato
  const { data: myShieldedBalance, refetch: refetchMyBalance } = useReadContract({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: 'getMyBalance',
    args: [address],
  });

  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const { writeContract, data: hash, error: writeError, isPending: isWalletLoading } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // Quando confirma a transação
  useEffect(() => {
    if (isConfirmed && hash) {
      refetchMyBalance(); // Atualiza o saldo
      
      const novaTransacao: Transaction = {
        hash: hash,
        type: mode,
        amount: amount,
        timestamp: new Date().toLocaleTimeString(),
      };
      setTransactions((prev) => [novaTransacao, ...prev]);

      toast.success(mode === 'deposit' ? 'Deposit Successful!' : 'Withdrawal Successful!', {
        description: mode === 'deposit' ? 'Assets shielded.' : 'Assets returned to wallet.',
        action: {
          label: 'Etherscan',
          onClick: () => window.open(`https://sepolia.etherscan.io/tx/${hash}`, '_blank'),
        },
      });
      setAmount('');
    }
  }, [isConfirmed, hash, refetchMyBalance]);

  // Tratamento de Erros
  useEffect(() => {
    if (writeError) {
      toast.error('Transaction Failed', { description: writeError.message.split('\n')[0] });
    }
  }, [writeError]);

  const handleAction = () => {
    if (!amount || !address) return;
    
    try {
      if (mode === 'deposit') {
        // Lógica de Depósito (Envia Value em ETH)
        writeContract({
          address: VAULT_ADDRESS,
          abi: VAULT_ABI,
          functionName: 'deposit',
          value: parseEther(amount),
        });
      } else {
        // Lógica de Saque (Envia Argumento amount)
        writeContract({
          address: VAULT_ADDRESS,
          abi: VAULT_ABI,
          functionName: 'withdraw',
          args: [parseEther(amount)],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#e6f1ff]">Dashboard</h1>
          <p className="text-[#8892b0]">{isConnected ? "Secure Connection Established." : "Connect Wallet."}</p>
        </div>
        {isConnected && (
            <div className="px-4 py-2 bg-[#64ffda]/10 border border-[#64ffda]/20 rounded-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-[#64ffda] rounded-full animate-pulse"></div>
                <span className="text-[#64ffda] text-sm font-mono">ZENTIQ V2 LIVE</span>
            </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Esquerda: Saldos */}
        <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Carteira Pública */}
                <div className="bg-[#112240] p-6 rounded-xl border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-gray-700/30 rounded-lg"><Wallet className="text-gray-300 w-6 h-6" /></div>
                        <span className="text-xs text-gray-400 font-mono">PUBLIC</span>
                    </div>
                    <h3 className="text-[#8892b0] text-sm mb-1">Wallet Balance</h3>
                    <p className="text-2xl font-bold text-[#e6f1ff]">
                        {walletBalance ? parseFloat(walletBalance.formatted).toFixed(4) : "---"} ETH
                    </p>
                </div>

                {/* Saldo Blindado (NOVO CONTRATO) */}
                <div className="bg-[#112240] p-6 rounded-xl border border-[#64ffda]/30 glow-effect relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldCheck size={60} /></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-[#64ffda]/10 rounded-lg"><Lock className="text-[#64ffda] w-6 h-6" /></div>
                        <span className="text-xs text-[#64ffda] font-mono font-bold bg-[#64ffda]/10 px-2 py-1 rounded">PRIVATE</span>
                    </div>
                    <h3 className="text-[#8892b0] text-sm mb-1">Your Shielded Balance</h3>
                    <p className="text-3xl font-bold text-[#e6f1ff]">
                        {myShieldedBalance ? parseFloat(formatEther(myShieldedBalance as bigint)).toFixed(4) : "0.0000"} ETH
                    </p>
                </div>
            </div>

            {/* Histórico */}
            <div className="bg-[#112240] rounded-xl border border-white/5 overflow-hidden min-h-[300px]">
                <div className="p-6 border-b border-white/5 flex items-center gap-2">
                    <History size={18} className="text-[#64ffda]"/>
                    <h3 className="text-lg font-bold text-[#e6f1ff]">Session History</h3>
                </div>
                <div className="divide-y divide-white/5">
                    {transactions.map((tx) => (
                        <div key={tx.hash} className="p-4 flex justify-between items-center hover:bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${tx.type === 'deposit' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {tx.type === 'deposit' ? <ArrowDownLeft size={16}/> : <ArrowUpRight size={16}/>}
                                </div>
                                <div>
                                    <p className="text-[#e6f1ff] font-medium capitalize">{tx.type}</p>
                                    <p className="text-xs text-[#8892b0]">{tx.timestamp}</p>
                                </div>
                            </div>
                            <p className="font-mono font-bold text-[#e6f1ff]">{tx.amount} ETH</p>
                        </div>
                    ))}
                    {transactions.length === 0 && (
                        <p className="text-center text-[#8892b0] py-10 opacity-50">No new transactions.</p>
                    )}
                </div>
            </div>
        </div>

        {/* Direita: Ação (Deposit/Withdraw) */}
        <div className="lg:col-span-1">
            <div className="bg-[#112240] p-6 rounded-xl border border-[#64ffda]/20 sticky top-24">
                
                {/* AQUI ESTÃO OS BOTÕES NOVOS */}
                <div className="flex bg-[#0a192f] p-1 rounded-lg mb-6 border border-white/5">
                    <button 
                        onClick={() => setMode('deposit')}
                        className={`flex-1 py-2 text-sm font-bold rounded transition-all ${mode === 'deposit' ? 'bg-[#64ffda] text-[#0a192f]' : 'text-[#8892b0] hover:text-white'}`}
                    >
                        DEPOSIT
                    </button>
                    <button 
                        onClick={() => setMode('withdraw')}
                        className={`flex-1 py-2 text-sm font-bold rounded transition-all ${mode === 'withdraw' ? 'bg-red-500 text-white' : 'text-[#8892b0] hover:text-white'}`}
                    >
                        WITHDRAW
                    </button>
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-xl font-bold text-[#e6f1ff]">
                        {mode === 'deposit' ? 'Shield Assets' : 'Unshield Assets'}
                    </h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-[#8892b0] uppercase font-bold ml-1">Amount</label>
                        <div className="relative mt-2">
                            <input 
                                type="number" 
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                disabled={!isConnected || isWalletLoading || isConfirming}
                                className="w-full bg-[#0a192f] border border-white/10 rounded-lg p-4 text-[#e6f1ff] focus:border-white/30 focus:outline-none transition-colors"
                            />
                            <span className="absolute right-4 top-4 text-[#8892b0] font-bold">ETH</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleAction}
                        disabled={!isConnected || !amount || isWalletLoading || isConfirming}
                        className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                            mode === 'deposit' 
                                ? 'bg-[#64ffda] text-[#0a192f] hover:bg-opacity-90' 
                                : 'bg-red-500 text-white hover:bg-red-600'
                        } ${(!isConnected || !amount) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isWalletLoading ? <Loader2 className="animate-spin"/> : (
                             mode === 'deposit' ? <>Lock Funds <Lock size={18}/></> : <>Withdraw Funds <ArrowUpRight size={18}/></>
                        )}
                    </button>
                    
                    {/* Botão de Atalho MAX */}
                    {mode === 'withdraw' && myShieldedBalance && (
                        <div className="text-right">
                            <button 
                                onClick={() => setAmount(formatEther(myShieldedBalance as bigint))}
                                className="text-xs text-[#64ffda] hover:underline cursor-pointer"
                            >
                                Max: {parseFloat(formatEther(myShieldedBalance as bigint)).toFixed(4)}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}