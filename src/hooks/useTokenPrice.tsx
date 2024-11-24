import type { DataState, NetworkId, ContractCallReturn, ContractCallResult } from "@types";

import { useEffect, useState } from "react";
import { useReadContract } from 'wagmi';
import { useQuery } from "@tanstack/react-query";

import { ZERO_ADDRESS, FIXED_CURRENCY_MAP, UNIV2_POOL_ABI, UNIV3_POOL_ABI, PAIR_MAP } from "../utils/constants";
import { formatNumber, formatAddress, formatV2Rate, formatV3Rate } from "../utils";

type UseReadContractReturnType = ReturnType<typeof useReadContract>;

interface ExtendedDataState extends DataState {
  tokenPrice: number;
  tokenAddress: string;
  isInvertedPair: boolean;
}

export function useTokenPrice(chainId: NetworkId, address: string, decimals: number): ExtendedDataState {
  const [dataState, setDataState] = useState<ExtendedDataState>({
    status: "loading",
    tokenPrice: 0,
    isInvertedPair: false,
    tokenAddress: ZERO_ADDRESS
  });

  const pair = address === ZERO_ADDRESS ? PAIR_MAP[ZERO_ADDRESS][chainId] : PAIR_MAP[address];
  const isUniswapV2 = pair?.version === '2';

  const payload: UseReadContractReturnType = useReadContract({
    abi: isUniswapV2 ? UNIV2_POOL_ABI : UNIV3_POOL_ABI,
    functionName: isUniswapV2 ? 'getReserves' : 'slot0',
    address: formatAddress(pair?.address)
  });

  const getV2TokenPrice = (data: Array<ContractCallReturn>) => {
    const reservesX: bigint = data[0] as bigint;
    const reservesY: bigint = data[1] as bigint;

    return formatV2Rate(`${reservesX}`, `${reservesY}`, 18, decimals);
  }

  const getV3TokenPrice = (data: Array<ContractCallReturn>) => {
    const sqrtPrice: bigint = data[0] as bigint;
    const currentTick: bigint = data[1] as bigint;

    return formatV3Rate(`${currentTick}`, 18, decimals);
  }

  const getTokenPrice = () => {
    if (payload.data) {
      const e: Array<ContractCallReturn> = Object.values(payload.data);

      return isUniswapV2 ? getV2TokenPrice(e) : getV3TokenPrice(e)
    }
    return 0;
  }

  const { data, isError, error } = useQuery({
    queryKey: [`getTokenPrice(${address})`],
    queryFn: () => getTokenPrice(),
    refetchInterval: 500
  })

  useEffect(() => {
    if (FIXED_CURRENCY_MAP[chainId][address]) return;
    if (data) {
      setDataState({
        status: "success",
        tokenPrice: data,
        tokenAddress: address,
        isInvertedPair: pair.inverted
      });
    }
  }, [data]);

  useEffect(() => {
    if (address && dataState.tokenAddress !== address) {
      setDataState({
        status: 'loading',
        tokenAddress: address,
        isInvertedPair: false,
        tokenPrice: 0
      })
    }
  }, [, address])

  useEffect(() => {
    if (FIXED_CURRENCY_MAP[chainId][address]) {
      setDataState({
        status: 'success',
        tokenPrice: 1,
        isInvertedPair: false,
        tokenAddress: ZERO_ADDRESS,
      })
    }
  }, [, address])

  return dataState;
}
