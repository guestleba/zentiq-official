// O endereço que você acabou de criar no Remix
export const VAULT_ADDRESS = '0x453D8b59ee2f47CE16cB8Df0966D29E21611FF99';

// A "Interface" (ABI) que ensina o site a conversar com o contrato
export const VAULT_ABI = [
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getVaultBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;