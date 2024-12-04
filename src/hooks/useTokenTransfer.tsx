import type { ContractCallReturn, DataState } from "@types"

import { useState, useEffect } from "react";
import { useReadContract, useWriteContract } from 'wagmi';
import { useQuery } from "@tanstack/react-query";

import { ZERO_ADDRESS, ERC20_ABI, PAIR_MAP } from "../utils/constants";
import { formatNumber, formatAddress } from "../utils";

type UseReadContractReturnType = ReturnType<typeof useReadContract>;

interface ExtendedDataState extends DataState {
  error?: string;
  tokenAddress: string;
  transactionHash?: string;
  mutate: () => Promise<void>;
}

export function useTokenTransfer(token: string, recipient: string, amount: string | number): ExtendedDataState {
  const [dataState, setDataState] = useState<ExtendedDataState>({
    status: 'loading',
    tokenAddress: token,
    mutate: () => new Promise((resolve) => resolve())
  })

  const { data, writeContract } = useWriteContract();

  const payload: UseReadContractReturnType = useReadContract({
    abi: ERC20_ABI,
    functionName: 'decimals',
    address: formatAddress(token)
  })

  const sendBalance = async () => {
    if (payload.data) {
      const i = amount || 0;
      const e = typeof i === 'string' ? Number(i) : i;

      const decimals: ContractCallReturn = payload.data;
      const value = e * Math.pow(10, decimals as number);

      try {
        await writeContract({
          abi: ERC20_ABI,
          address: formatAddress(token),
          functionName: 'transfer',
          args: [recipient, BigInt(value)]
        })

        await setDataState({ ...dataState, status: 'success', transactionHash: data })
      } catch {
        throw new Error();
      }
    }
  }

  useEffect(() => {
    if (dataState.tokenAddress !== token) {
      setDataState({
        mutate: sendBalance,
        status: 'loading',
        tokenAddress: token
      })
    }
  }, [token])

  useEffect(() => {
    setDataState({ ...dataState, mutate: sendBalance });
  }, [, amount])

  return dataState;
}
