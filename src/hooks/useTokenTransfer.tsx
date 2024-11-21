import type { ContractCallReturn, DataState } from "@types"

import { useState, useEffect } from "react";
import { useReadContract, useWriteContract } from 'wagmi';
import { useQuery } from "@tanstack/react-query";

import { ZERO_ADDRESS, ERC20_ABI, PAIR_MAP } from "../utils/constants";
import { formatNumber, formatAddress } from "../utils";

type UseReadContractReturnType = ReturnType<typeof useReadContract>;

interface ExtendedDataState extends DataState {
  error?: string;
  mutate: () => void;
  tokenAddress: string;
  transactionHash?: string;
}

export function useTokenTransfer(token: string, recipient: string, amount: number): ExtendedDataState {
  const [dataState, setDataState] = useState<ExtendedDataState>({
    status: 'loading',
    tokenAddress: token,
    mutate: () => { }
  })

  const { data, writeContract } = useWriteContract();

  const payload: UseReadContractReturnType = useReadContract({
    abi: ERC20_ABI,
    functionName: 'decimals',
    address: address ? formatAddress(address) : undefined
  })

  const sendBalance = async () => {
    if (payload.data) {
      const decimals: ContractCallReturn = payload.data;
      const value: Number = amount * Math.pow(10, decimals as number);

      try {
        await writeContract({
          abi: ERC20_ABI,
          address: ,
          functionName 'transfer',
          args: [recipient, amount]
        })
      } catch (err: Error) {
        throw err;
      } finally {
        setDataState({ status: 'success', txHash: data })
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
  }, [])

  return dataState;
}
