import type { ContractCallReturn, DataState } from "@types"

import { useState, useEffect } from "react";
import { useSendTransaction } from "wagmi";
import { useQuery } from "@tanstack/react-query";

import { ZERO_ADDRESS, ERC20_ABI, PAIR_MAP } from "../utils/constants";
import { formatNumber, formatAddress } from "../utils";

interface ExtendedDataState extends DataState {
  error?: string;
  mutate: () => void;
  transactionHash?: string;
}

export function useTransfer(recipient: string, amount: string | number): ExtendedDataState {
  const [dataState, setDataState] = useState<ExtendedDataState>({
    status: 'loading',
    mutate: () => { }
  })

  const value = amount ? Number(amount) * Math.pow(10, 18) : undefined;

  const { data, sendTransaction } = useSendTransaction();

  const sendBalance = async () => {
    const to = formatAddress(recipient);
    const value = BigInt(amount || 0);

    try {
      await sendTransaction({ to, value })
    } catch {
      throw new Error();
    } finally {
      setDataState({ ...dataState, status: 'success', transactionHash: data })
    }
  }

  useEffect(() => {
    setDataState({ ...dataState, mutate: sendBalance });
  }, [])

  return dataState;
}
