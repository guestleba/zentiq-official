"use client";

import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { Wallet, ArrowDownLeft, ShieldCheck, Lock, ArrowRight, ExternalLink, Clock, Loader2, Database } from 'lucide-react';
import { toast } from 'sonner';
import { VAULT_ADDRESS, VAULT_ABI } from '@/config/contracts';

type Transaction = {
  hash: string;
  amount: string;
  timestamp: string;
};

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  
  // 1. Saldo da Carteira do Usuário (Wallet)
  const { data: walletBalance } = useBalance({ address });
  
  // 2. LEITURA REAL DA BLOCKCHAIN: Saldo do Cofre Zentiq
  // O hook `useReadContract` vigia o contrato automaticamente
  const { data: vaultBalanceData, refetch: refetchVault } = useReadContract({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: 'getVaultBalance',
  });

  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const { writeContract, data: hash, error: writeError, isPending: isWalletLoading } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Quando a transação confirma, atualizamos os dados
  useEffect(() => {
    if (isConfirmed && hash) {
      // Força o site a reler o saldo do cofre na blockchain
      refetchVault(); 
      // Atualiza saldo da carteira também
      // (O wagmi faz isso sozinho geralmente, mas é bom garantir)

      const novaTransacao: Transaction = {
        hash: hash,
        amount: amount,
        timestamp: new Date().toLocaleTimeString(),
      };
      setTransactions((prev) => [novaTransacao, ...prev]);

      toast.success('Secure Deposit Complete!', {
        description: `Funds successfully locked in Zentiq Vault.`,
        action: {
          label: 'View on Etherscan',
          onClick: () => window.open(`https://sepolia.etherscan.io/tx/${hash}`, '_blank'),
        },
      });
      
      setAmount('');
    }
  }, [isConfirmed, hash, refetchVault, amount]); // Adicionado dependências

  // Tratamento de erros
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
      writeContract({
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
        functionName: 'deposit',
        value: parseEther(amount),
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
                <span className="text-[#64ffda] text-sm font-mono">SEPOLIA LIVE DATA</span>
            </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Lado Esquerdo */}
        <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Wallet Balance */}
                <div className="bg-[#112240] p-6 rounded-xl border border-white/5 glow-effect">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-[#64ffda]/10 rounded-lg">
                        <Wallet className="text-[#64ffda] w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-[#8892b0] text-sm mb-1">Your Wallet</h3>
                    <p className="text-3xl font-bold text-[#e6f1ff]">
                        {isConnected && walletBalance 
                            ? `${parseFloat(walletBalance.formatted).toFixed(4)} ETH`
                            : "---"}
                    </p>
                </div>

                {/* Vault Balance (REAL DA BLOCKCHAIN) */}
                <div className="bg-[#112240] p-6 rounded-xl border border-white/5 relative overflow-hidden">
                    {/* Efeito de fundo */}
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Database size={60} />
                    </div>
                    
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                            <ShieldCheck className="text-blue-400 w-6 h-6" />
                        </div>
                        {/* Indicador de Atualização */}
                        {isConfirming && (
                             <span className="text-yellow-400 text-xs font-bold px-2 py-1 bg-yellow-400/10 rounded animate-pulse flex items-center gap-1">
                                <Loader2 size={10} className="animate-spin"/> SYNCING
                             </span>
                        )}
                    </div>
                    <h3 className="text-[#8892b0] text-sm mb-1">Total Vault Value (TVL)</h3>
                    <p className="text-3xl font-bold text-[#e6f1ff]">
                        {/* Aqui formatamos o BigInt que vem do contrato para número legível */}
                        {vaultBalanceData 
                            ? `${parseFloat(formatEther(vaultBalanceData as bigint)).toFixed(4)} ETH`
                            : "0.0000 ETH"}
                    </p>
                </div>
            </div>

            {/* Lista de Transações (Local Session) */}
            <div className="bg-[#112240] rounded-xl border border-white/5 overflow-hidden min-h-[300px]">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-[#e6f1ff]">Session Activity</h3>
                    <span className="text-xs text-[#8892b0] bg-white/5 px-2 py-1 rounded">
                        {transactions.length} Txs
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
                                            <p className="text-[#e6f1ff] font-medium">Vault Deposit</p>
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
                            <p>No activity in this session.</p>
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
                            <>Syncing Chain... <Loader2 className="animate-spin" size={18}/></>
                        ) : (
                            <>Deposit to Vault <ArrowRight size={18} /></>
                        )}
                    </button>
                    
                    {isConfirming && (
                         <p className="text-xs text-center text-[#64ffda] animate-pulse mt-2">
                             Block confirmations in progress...
                         </p>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}