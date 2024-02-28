"use client";

import { PropsWithChildren } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { metaMask } from "wagmi/connectors";


export const config = createConfig({
  chains: [sepolia],
  connectors: [metaMask({useDeeplink: true, shouldShimWeb3: true, dappMetadata:{name: "blockchats", url: "https://blockchats.ru"}})],
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
