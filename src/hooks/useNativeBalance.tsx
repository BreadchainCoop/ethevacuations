import type { DataState, TokenBalance } from "@types";

import { useEffect, useState } from "react";
import { useBalance } from 'wagmi';
import { useQuery } from "@tanstack/react-query";

import { formatNumber, formatAddress } from "../utils";
import { ZERO_ADDRESS } from "../utils/constants";

interface ExtendedDataState extends DataState {
  nativeBalance: TokenBalance;
}

export function useNativeBalance(address: string | undefined): ExtendedDataState {
  const [dataState, setDataState] = useState<ExtendedDataState>({
    status: 'loading',
    nativeBalance: {
      value: BigInt(0),
      symbol: '',
      decimals: 0,
      formatted: ''
    }
  });

  const payload = useBalance({ address: formatAddress(!address ? ZERO_ADDRESS : address) });

  const { data } = useQuery({
    queryKey: [`getBalance(${address})`],
    queryFn: () => payload.data,
    enabled: !!payload.data
  })

  useEffect(() => {
    if (data) {
      setDataState({
        status: 'success',
        nativeBalance: {
          ...data,
          formatted: formatNumber(Number(data.formatted), 4)
        }
      })
    }
  }, [data])

  return dataState;
} 
