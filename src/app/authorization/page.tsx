"use client"

import Button from "@/components/ui/Button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useConnect } from "wagmi";
import { injected, metaMask } from 'wagmi/connectors'

export default function Authorization() {
  const { open } = useWeb3Modal()
  return (
    <div className="flex justify-center items-center flex-col h-full gap-2">
      <p className="text-2xl">You are not authorized on our website, to connect click on:</p>
      <Button
        onClick={() => open({view: "Connect"})}
        variant="primary" className="text-xl">Connect Wallet</Button>
    </div>
  )
}
