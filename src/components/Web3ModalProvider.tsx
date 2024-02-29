"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { PropsWithChildren } from 'react';

import { WagmiProvider, cookieStorage, createStorage } from 'wagmi'
import { sepolia } from 'wagmi/chains'

const projectId = "6d6f1164282c3ea317201fe668bb4e14"
 
if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'BlockChats',
  description: '',
  url: 'https://blockchats.ru/', 
  icons: ["../../app/favicon.ico"]
}
const queryClient = new QueryClient()

export const config = defaultWagmiConfig({
  chains: [sepolia], 
  projectId, 
  metadata, 
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  enableWalletConnect: true, 
})
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  tokens: {
    1: {
      address: '0x70D61aED603c36b5EDa84bAfeDEBc24b6213e5c3',
    }
  }
  })

export const Web3ModalProvider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
