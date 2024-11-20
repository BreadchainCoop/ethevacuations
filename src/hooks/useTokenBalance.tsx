import type {
  DataState,
  TokenBalance,
  ContractCallReturn,
  ContractCallResult
} from "@types";

import { useEffect, useState } from "react";
import { useReadContracts } from 'wagmi';
import { useQuery } from "@tanstack/react-query";

import { formatNumber, formatAddress } from "../utils";
import { ZERO_ADDRESS, ERC20_ABI, PAIR_MAP } from "../utils/constants";

interface ExtendedDataState extends DataState {
  tokenBalance: TokenBalance;
}

type UseReadContractReturnType = ReturnType<typeof useReadContracts>;

export function useTokenBalance(token: string, address: string | undefined): ExtendedDataState {
  const [dataState, setDataState] = useState<ExtendedDataState>({
    status: "loading",
    tokenBalance: {
      value: BigInt(0),
      symbol: '',
      decimals: 0,
      formatted: ''
    }
  });

  const payload: UseReadContractReturnType = useReadContracts({
    contracts: [
      {
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        address: token ? formatAddress(token) : undefined,
        args: [address]
      },
      {
        abi: ERC20_ABI,
        functionName: 'symbol',
        address: token ? formatAddress(token) : undefined
      },
      {
        abi: ERC20_ABI,
        functionName: 'decimals',
        address: token ? formatAddress(token) : undefined
      }
    ]
  });

  const getTokenBalance = () => {
    if (payload.data) {
      const e: Array<ContractCallReturn> = Object.values(payload.data);

      const symbol: ContractCallResult = e[1].result;
      const decimals: ContractCallResult = e[2].result;
      const balance: ContractCallResult = e[0].result;

      const value = Number(balance) / Math.pow(10, Number(decimals));

      return {
        value: balance as bigint,
        symbol: symbol as string,
        decimals: decimals as number,
        formatted: formatNumber(value, 2),
      }
    }
    return {
      value: BigInt(0),
      symbol: '',
      decimals: 0,
      formatted: '0.00',
    }
  }

  const { data } = useQuery({
    queryKey: [`getTokenBalance(${address})`],
    queryFn: () => getTokenBalance(),
    enabled: !!payload.data
  })

  useEffect(() => {
    if (data) {
      setDataState({
        status: 'success',
        tokenBalance: data
      })
    }
  }, [data])

  return dataState;
}


