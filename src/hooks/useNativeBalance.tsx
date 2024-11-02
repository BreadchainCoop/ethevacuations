import { useEffect, useState } from "react";
import { useBalance } from 'wagmi';
import { useQuery } from "@tanstack/react-query";

import { formatNumber } from "../utils";

interface DataState {
  status: 'loading' | 'success' | 'error';
  nativeBalance: Balance;
}

interface Balance {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
}

export function useNativeBalance(address: string | null): DataState {
  const [dataState, setDataState] = useState<DataState>({
    status: 'loading',
    nativeBalance: 0
  });

  const payload = useBalance({ address });

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
