"use client";

import { abi } from "@/lib/abi";
import { useEffect, useState } from "react";
import { useAccount, useConfig } from "wagmi";
import {
  GetBalanceReturnType,
  getBalance,
  readContract,
} from "wagmi/actions";

export const Balance = () => {
  const testTokenAddress = "0x70D61aED603c36b5EDa84bAfeDEBc24b6213e5c3";
  const config = useConfig();
  const { address } = useAccount();
  const [balance, setBalance] = useState<GetBalanceReturnType>();
  const [availableTokens, setAvailableTokens] = useState<any>();

  useEffect(() => {
    async function getBalances() {
      try {
        const balanceResult = await getBalance(config, {
          address: address || '0x',
          token: testTokenAddress,
        });
        setBalance(balanceResult);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function getAvailableTokens() {
      try {
        const result = await readContract(config, {
          abi,
          address: "0xbC9354aB2608B6341CCEb9bC36f835DF61A4F2DA",
          functionName: "getAvailableTokens",
        });
        setAvailableTokens(result);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getBalances();
    getAvailableTokens();

    const intervalId = setInterval(getBalances, 60000);

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [config, address]);

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
