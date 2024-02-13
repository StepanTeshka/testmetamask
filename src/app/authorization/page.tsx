"use client"

import Button from "@/components/ui/Button";
import { useConnect } from "wagmi";
import { metaMask } from 'wagmi/connectors'

export default function Authorization() {
  const { connect } = useConnect()
  return (
    <div className="flex justify-center items-center flex-col h-full gap-2">
      <p className="text-2xl">You are not authorized on our website, to connect click on:</p>
      <Button
        onClick={() => connect({ connector: metaMask() })}
        variant="primary" className="text-xl">Connect Wallet</Button>
    </div>
  )
}
