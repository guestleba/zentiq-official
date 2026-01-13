import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains'; // 1. Importamos a Sepolia

export const config = getDefaultConfig({
  appName: 'Zentiq Platform',
  projectId: 'YOUR_PROJECT_ID',
  // 2. Colocamos sepolia PRIMEIRO na lista. Isso a torna a rede padrão.
  chains: [sepolia, mainnet],
  ssr: true,
});