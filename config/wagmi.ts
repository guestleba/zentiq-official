import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Zentiq Platform',
  projectId: 'YOUR_PROJECT_ID', // O RainbowKit pede isso, pode deixar assim para teste local
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // Importante para Next.js
});