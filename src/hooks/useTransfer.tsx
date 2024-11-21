import type { ContractCallReturn, DataState } from "@types"

import { useState, useEffect } from "react";
import { usePrepareSendTransaction, useSendTransaction } from "wagmi";
import { useQuery } from "@tanstack/react-query";

import { ZERO_ADDRESS, ERC20_ABI, PAIR_MAP } from "../utils/constants";
import { formatNumber, formatAddress } from "../utils";

interface ExtendedDataState extends DataState {
  error?: string;
  mutate: () => void;
  transactionHash?: string;
}

export function useTransfer(recipient: string, amount: number): ExtendedDataState {
  const [dataState, setDataState] = useState<ExtendedDataState>({
    status: 'loading',
    mutate: () => { }
  })

  const value = amount ? amount * Math.pow(10, 18) : undefined;

  const { config } = usePrepareSendTransaction({
    to: formatAddress(recipient),
    value: value
  });
  const { data, sendTransaction } = useSendTransaction(config);

  const sendBalance = async () => {
    try {
      await sendTransaction(config)
    } catch (err: Error) {
      throw err;
    } finally {
      setDataState({ ...dataState, status: 'success', transactionHash: data })
    }
  }

  useEffect(() => {
    setDataState({ ...dataState, mutate: sendBalance });
  }, [])

  return dataState;
}
