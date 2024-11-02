
import { useEffect, useState } from "react";
import { useReadContracts } from 'wagmi';
import { useQuery } from "@tanstack/react-query";

import { ZERO_ADDRESS, ERC20_ABI } from "../utils/constants";
import { formatNumber } from "../utils";

type TokenAddress = keyof typeof PAIR_MAP;

type ContractCallParameter = number | string | bigint | boolean;

type ContractCalldata = Array<ContractCallParameter>;

type UseReadContractReturnType = ReturnType<typeof useReadContract>;

interface DataState {
  status: 'loading' | 'success' | 'error';
  tokenBalance: Balance;
}

interface Balance {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
}

export function useTokenBalance(token: TokenAddress, address: string): DataState {
  const [dataState, setDataState] = useState<DataState>({
    status: "loading",
    tokenBalance: 0,
  });

  const payload = useReadContracts({
    contracts: [
      {
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        address: token ? `0x${token.substring(2, token.length)}` : '',
        args: [address]
      },
      {
        abi: ERC20_ABI,
        functionName: 'symbol',
        address: token ? `0x${token.substring(2, token.length)}` : ''
      },
      {
        abi: ERC20_ABI,
        functionName: 'decimals',
        address: token ? `0x${token.substring(2, token.length)}` : ''
      }
    ]
  });

  const getTokenBalance = () => {
    const e: ContractCallData = Object.values(payload.data);
    const tokenSymbol: ContractCallParameter = e[1].result;
    const tokenDecimals: ContractCallParameter = e[2].result;
    const tokenBalance: ContractCallParameter = e[0].result;

    if (tokenBalance > 0) {
      const value = Number(tokenBalance) / Math.pow(10, tokenDecimals);

      return {
        value: tokenBalance,
        decimals: tokenDecimals,
        formatted: formatNumber(value, 2),
        symbol: tokenSymbol
      }
    } else {
      return {
        value: 0n,
        decimals: tokenDecimals,
        formatted: '0.00',
        symbol: tokenSymbol
      }
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


