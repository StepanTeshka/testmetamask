"use client";

import { Balance } from "@/components/ui/Balance";
import Button from "@/components/ui/Button";
import { abi } from "@/lib/abi";
import { useState } from "react";
import { GetContractErrorType } from "viem";
import { BaseError, BaseErrorType, useChainId, useConfig } from "wagmi";
import { writeContract } from "wagmi/actions";

export default function Home() {
  const chainId = useChainId();
  const config = useConfig();

  const [errorClaim, setErrorClaim] = useState<string>();
  const [errorSendTokens, setErrorSendTokens] = useState<string>();

  const onClaim = async () => {
    try {
      const result = await writeContract(config, {
        abi,
        address: "0xbC9354aB2608B6341CCEb9bC36f835DF61A4F2DA",
        functionName: "claim",
      });
    } catch (e) {
      const error = e as BaseError
      setErrorClaim(error.shortMessage.split("reason:")[1].trim());
    }
  }
  const onSendTokens = async () => {
    try {
      const result = await writeContract(config, {
        abi,
        address: "0xbC9354aB2608B6341CCEb9bC36f835DF61A4F2DA",
        functionName: "sendTokens",
        args: [100],
      });
    } catch (e) {
      const error = e as BaseError
      setErrorSendTokens(error.shortMessage.split("reason:")[1].trim());
    }
  }

  return (
    <div className="px-6">
      {chainId === 11155111 ? (
        <div className="flex flex-col gap-4">
          <Balance />
          <Button variant="primary" onClick={() => onClaim()}>
            Claim
          </Button>
          {errorClaim ? <p className="text-red-900">Ошибка: {errorClaim}</p> : null}
          <Button variant="primary" onClick={() => onSendTokens()}>
            Pick up tokens
          </Button>
          {errorSendTokens ? <p className="text-red-900">Ошибка: {errorSendTokens}</p> : null}
        </div>
      ) : (
        <div>
          <p>Измените сеть!</p>
        </div>
      )}
    </div>
  );
}
