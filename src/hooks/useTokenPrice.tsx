import { useEffect, useState } from "react";
import { useReadContract } from 'wagmi';
import { useQuery } from "@tanstack/react-query";

import { ZERO_ADDRESS, UNIV2_POOL_ABI, UNIV3_POOL_ABI, PAIR_MAP } from "../utils/constants";
import { formatNumber, formatV2Rate, formatV3Rate } from "../utils";

type TokenAddress = keyof typeof PAIR_MAP;

type ContractCallParameter = number | string | bigint | boolean;

type ContractCalldata = Array<ContractCallParameter>;

type UseReadContractReturnType = ReturnType<typeof useReadContract>;

interface DataState {
  status: 'loading' | 'success' | 'error';
  tokenPrice: number;
  tokenAddress: string;
  isInvertedPair: boolean;
}

export function useTokenPrice(chainId: string, address: TokenAddress, decimals: number): DataState {
  const [dataState, setDataState] = useState<DataState>({
    status: "loading",
    tokenPrice: 0,
    isInvertedPair: false,
    tokenAddress: ZERO_ADDRESS
  });

  const pair = address === ZERO_ADDRESS ? PAIR_MAP[address][chainId] : PAIR_MAP[address];
  const isUniswapV2 = pair?.version === '2';

  const payload: UseReadContractReturnType = useReadContract({
    abi: isUniswapV2 ? UNIV2_POOL_ABI : UNIV3_POOL_ABI,
    functionName: isUniswapV2 ? 'getReserves' : 'slot0',
    address: `0x${pair?.address.substring(2, pair?.address.length)}`
  });

  const getV2TokenPrice = (data: ContractCalldata) => {
    const reservesX: ContractCallParameter = data[0];
    const reservesY: ContractCallParameter = data[1];

    return formatV2Rate(`${reservesX}`, `${reservesY}`, 18, decimals);
  }

  const getV3TokenPrice = (data: ContractCalldata) => {
    const sqrtPrice: ContractCallParameter = data[0];
    const currentTick: ContractCallParameter = data[1];

    return formatV3Rate(`${currentTick}`, 18, decimals);
  }

  const getTokenPrice = () => {
    const e: ContractCalldata = Object.values(payload.data);

    return isUniswapV2 ? getV2TokenPrice(e) : getV3TokenPrice(e);
  }

  const { data, isError, error } = useQuery({
    queryKey: [`getTokenPrice(${address})`],
    queryFn: () => getTokenPrice(),
    refetchInterval: 1000
  })

  useEffect(() => {
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
        isInvertedPair: pair.inverted,
        tokenPrice: 0
      })
    }
  }, [address])

  return dataState;
}
