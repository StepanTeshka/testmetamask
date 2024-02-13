"use client";

import { PropsWithChildren, useEffect } from "react";
import NavBar from "./NavBar";
import { useRouter } from "next/navigation";
import { Web3ModalProvider } from "./Web3ModalProvider";
import { useAccount } from "wagmi";

export const Bg = ({ children }: PropsWithChildren) => {
  const { isConnected } = useAccount();

  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.replace("/authorization");
    } else {
      router.replace("/");
    }
  }, [router, isConnected]);

  return (
    <div>
      <NavBar />
      <main className="h-full">{children}</main>
    </div>
  );
};
