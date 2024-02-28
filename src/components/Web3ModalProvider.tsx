"use client";

import { PropsWithChildren } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected, metaMask } from "wagmi/connectors";


export const config = createConfig({
  chains: [sepolia],
  connectors: [injected({target: 'metaMask'})],
  transports: {
    [sepolia.id]: http(),
  },
  
});

const queryClient = new QueryClient();

export const Web3ModalProvider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config} reconnectOnMount={true}> 
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
