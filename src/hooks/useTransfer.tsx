import type { ContractCallReturn, DataState } from "@types"
import type { SendTransactionReturnType } from '@wagmi/core'

import { useState, useEffect } from "react";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useQuery } from "@tanstack/react-query";

import { ZERO_ADDRESS, ERC20_ABI, PAIR_MAP } from "../utils/constants";
import { formatNumber, formatAddress } from "../utils";

interface ExtendedDataState extends DataState {
  error?: string;
  mutate: () => Promise<void>;
  transactionHash?: string;
}

export function useTransfer(recipient: string, amount: string | number): ExtendedDataState {
  const [dataState, setDataState] = useState<ExtendedDataState>({
    status: 'loading',
    mutate: () => new Promise((resolve) => resolve())
  })

  const { data, sendTransactionAsync } = useSendTransaction();

  const sendBalance = async () => {
    const to = formatAddress(recipient);
    const value = typeof amount === 'number' ? `${amount}` : amount;

    try {
      await sendTransactionAsync({ to, value: parseEther(value) }, {
        onSuccess: () => {
          setDataState({ ...dataState, status: 'success' })
        }
      })
    } catch {
      throw new Error();
    }
  }

  useEffect(() => {
    setDataState({ ...dataState, mutate: sendBalance });
  }, [, amount, recipient])

  return dataState;
}
