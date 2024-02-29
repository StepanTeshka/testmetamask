"use client";

import { abi } from "@/lib/abi";
import { useEffect, useState } from "react";
import { useAccount, useConfig, useReadContract } from "wagmi";
import {
  GetBalanceReturnType,
  getBalance,
} from "wagmi/actions";

export const Balance = () => {
  const testTokenAddress = "0x70D61aED603c36b5EDa84bAfeDEBc24b6213e5c3";
  const config = useConfig();
  const { address } = useAccount();
  const [balance, setBalance] = useState<GetBalanceReturnType>();
  const { data: availableTokens } = useReadContract({
    abi: abi,
    address: '0xbC9354aB2608B6341CCEb9bC36f835DF61A4F2DA',
    functionName: "getAvailableTokens"
  });

  useEffect(() => {
    async function getBalances() {
      try {
        const balanceResult = await getBalance(config, {
          address: address || "0x",
          token: testTokenAddress,
        });
        setBalance(balanceResult);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getBalances();

    const intervalId = setInterval(getBalances, 60000);

    return () => clearInterval(intervalId);
  }, [address]);

  const dotIndex = balance?.formatted.indexOf(".") || 0;

  // Обрезаем строку до индекса первой точки + 1 (включая точку)
  const trimmedString = balance?.formatted.substring(0, dotIndex + 4);

  return (
    <div className="flex gap-3">
      <p>
        Ваша валюта:{" "}
        <span>
          {balance?.formatted !== undefined ? trimmedString : "Загрузка"}
        </span>{" "}
        <span>LINK</span>
      </p>
      <p>
        Полученная валюта: <span>{availableTokens ? availableTokens : 0}</span>
      </p>
    </div>
  );
};
