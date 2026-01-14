"use client";

import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { Wallet, ArrowDownLeft, ShieldCheck, Lock, ArrowRight, ExternalLink, Clock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { VAULT_ADDRESS, VAULT_ABI } from '@/config/contracts'; // <--- Importando o arquivo que você criou

type Transaction = {
  hash: string;
  amount: string;
  timestamp: string;
};

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });
  
  // Estados da tela
  const [amount, setAmount] = useState('');
  const [shieldedVolume, setShieldedVolume] = useState(0); 
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // 1. Hook para ESCREVER no contrato (Chamar a função deposit)
  const { writeContract, data: hash, error: writeError, isPending: isWalletLoading } = useWriteContract();

  // 2. Hook para ESPERAR a confirmação da Blockchain (O "Loading" real)
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // EFEITO: Monitora quando a transação é CONFIRMADA na blockchain
  useEffect(() => {
    if (isConfirmed && hash) {
      // Atualiza valores visuais
      const valorNumerico = parseFloat(amount);
      setShieldedVolume((prev) => prev + valorNumerico);

      const novaTransacao: Transaction = {
        hash: hash,
        amount: amount,
        timestamp: new Date().toLocaleTimeString(),
      };
      setTransactions((prev) => [novaTransacao, ...prev]);

      // Sucesso!
      toast.success('Secure Deposit Complete!', {
        description: `Funds successfully locked in Zentiq Vault.`,
        action: {
          label: 'View on Etherscan',
          onClick: () => window.open(`https://sepolia.etherscan.io/tx/${hash}`, '_blank'),
        },
      });
      
      setAmount(''); // Limpa o campo
    }
  }, [isConfirmed, hash]);

  // EFEITO: Monitora erros
  useEffect(() => {
    if (writeError) {
      toast.error('Transaction Failed', {
        description: writeError.message.includes('User rejected') 
          ? 'Transaction rejected by user.' 
          : 'Contract interaction failed.'
      });
    }
  }, [writeError]);

  const handleShield = () => {
    if (!amount || !address) {
        toast.warning('Invalid Input');
        return;
    }
    
    try {
      // AQUI ESTÁ A MÁGICA: Chamamos a função 'deposit' do contrato
      writeContract({
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
        functionName: 'deposit',
        value: parseEther(amount), // Envia o valor em ETH junto com a chamada
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
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
                <span className="text-[#64ffda] text-sm font-mono">SEPOLIA NETWORK CONNECTED</span>
            </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Lado Esquerdo */}
        <div className="lg:col-span-2 space-y-6">
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
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                        <ShieldCheck className="text-blue-400 w-6 h-6" />
                        </div>
                        {isConfirming && (
                             <span className="text-yellow-400 text-xs font-bold px-2 py-1 bg-yellow-400/10 rounded animate-pulse flex items-center gap-1">
                                <Loader2 size={10} className="animate-spin"/> CONFIRMING
                             </span>
                        )}
                    </div>
                    <h3 className="text-[#8892b0] text-sm mb-1">Total Shielded Volume</h3>
                    <p className="text-3xl font-bold text-[#e6f1ff]">
                        {shieldedVolume.toFixed(4)} ETH
                    </p>
                </div>
            </div>

            {/* Lista de Transações */}
            <div className="bg-[#112240] rounded-xl border border-white/5 overflow-hidden min-h-[300px]">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-[#e6f1ff]">Recent Activity</h3>
                    <span className="text-xs text-[#8892b0] bg-white/5 px-2 py-1 rounded">
                        {transactions.length} Transactions
                    </span>
                </div>
                
                <div className="p-0">
                    {transactions.length > 0 ? (
                        <div className="divide-y divide-white/5">
                            {transactions.map((tx) => (
                                <div key={tx.hash} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors animate-in fade-in slide-in-from-top-2">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-[#64ffda]/10 rounded-full text-[#64ffda]">
                                            <ArrowDownLeft size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[#e6f1ff] font-medium">Smart Contract Deposit</p>
                                            <p className="text-xs text-[#8892b0] flex items-center gap-1">
                                                <Clock size={10} /> {tx.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[#64ffda] font-bold">+{tx.amount} ETH</p>
                                        <a href={`https://sepolia.etherscan.io/tx/${tx.hash}`} target="_blank" className="text-xs text-[#8892b0] hover:text-[#e6f1ff] flex items-center justify-end gap-1">
                                            Explorer <ExternalLink size={10} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-[#8892b0] flex flex-col items-center justify-center h-full">
                            <ShieldCheck className="w-12 h-12 mb-4 opacity-20" />
                            <p>No activity recorded yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Lado Direito (Formulário) */}
        <div className="lg:col-span-1">
            <div className="bg-[#112240] p-6 rounded-xl border border-[#64ffda]/20 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#64ffda] rounded text-[#0a192f]">
                        <Lock size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-[#e6f1ff]">Shield Assets</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-[#8892b0] uppercase font-bold ml-1">Amount to Lock</label>
                        <div className="relative mt-2">
                            <input 
                                type="number" 
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                disabled={!isConnected || isWalletLoading || isConfirming}
                                className="w-full bg-[#0a192f] border border-white/10 rounded-lg p-4 text-[#e6f1ff] focus:border-[#64ffda] focus:outline-none transition-colors"
                            />
                            <span className="absolute right-4 top-4 text-[#8892b0] font-bold">ETH</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleShield}
                        disabled={!isConnected || !amount || isWalletLoading || isConfirming}
                        className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                            !isConnected || !amount
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                : 'bg-[#64ffda] text-[#0a192f] hover:bg-opacity-90 hover:scale-[1.02]'
                        }`}
                    >
                        {isWalletLoading ? (
                            <>Confirm in Wallet <Loader2 className="animate-spin" size={18}/></>
                        ) : isConfirming ? (
                            <>Processing on Chain <Loader2 className="animate-spin" size={18}/></>
                        ) : (
                            <>Deposit to Vault <ArrowRight size={18} /></>
                        )}
                    </button>
                    
                    {isConfirming && (
                         <p className="text-xs text-center text-[#64ffda] animate-pulse mt-2">
                             Validating transaction on Sepolia Network...
                         </p>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}