import type { DataState, NetworkId, ContractCallReturn, ContractCallResult } from "@types";

import { useEffect, useState } from "react";
import { useReadContracts } from 'wagmi';
import { useQuery } from "@tanstack/react-query";

import { ZERO_ADDRESS, FIXED_CURRENCY_MAP, ERC20_ABI, UNIV2_POOL_ABI, UNIV3_POOL_ABI, PAIR_MAP } from "../utils/constants";
import { formatNumber, formatAddress, formatV2Rate, formatV3Rate } from "../utils";

type UseReadContractsReturnType = ReturnType<typeof useReadContracts>;

interface ExtendedDataState extends DataState {
  tokenPrice: number;
  tokenAddress: string;
  isInvertedPair: boolean;
}

export function useTokenPrice(chainId: string, address: string, variable?: boolean): ExtendedDataState {

  const [dataState, setDataState] = useState<ExtendedDataState>({
    status: "loading",
    tokenPrice: 0,
    isInvertedPair: false,
    tokenAddress: ZERO_ADDRESS
  });

  const pair = PAIR_MAP[address];
  const isUniswapV2 = pair?.version === '2';

  const payload: UseReadContractsReturnType = useReadContracts({
    contracts: [
      {
        abi: ERC20_ABI,
        functionName: 'decimals',
        address: formatAddress(address)
      },
      {
        abi: isUniswapV2 ? UNIV2_POOL_ABI : UNIV3_POOL_ABI,
        functionName: isUniswapV2 ? 'getReserves' : 'slot0',
        address: formatAddress(pair?.address)
      }
    ]
  });

  const getTokenPrice = () => {
    if (payload.data) {
      const entries: Array<ContractCallReturn> = Object.values(payload.data);

      const resultEntry = entries[1];
      const result = resultEntry.result;

      if (result === undefined) return 0;

      const processedResult = Array.isArray(result)
        ? result
        : [result];

      const x = processedResult[0] as bigint;
      const y = processedResult[1] as bigint;
      const d = entries[0].error ? 18 : entries[0].result as number;

      if (isUniswapV2) {
        return formatV2Rate(x, y, 18, d);
      } else {
        const z = processedResult[1] as bigint;
        const x = !pair.inverted ? 18 : d;
        const y = !pair.inverted ? d : 18;

        return formatV3Rate(z, x, y);
      }
    }
    return 0;
  }

  const { data, isError, error } = useQuery({
    queryKey: [`getTokenPrice(${address})`],
    queryFn: () => getTokenPrice(),
    refetchInterval: 500
  })

  useEffect(() => {
    if (FIXED_CURRENCY_MAP[chainId][address] && variable) return;
    if (data && dataState.status === 'loading') {
      setDataState({
        status: "success",
        tokenPrice: data,
        tokenAddress: address,
        isInvertedPair: pair.inverted
      });
    }
  }, [data, dataState]);


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
    if (FIXED_CURRENCY_MAP[chainId][address] && variable) {
      setDataState({
        status: 'success',
        tokenPrice: 1,
        isInvertedPair: false,
        tokenAddress: address,
      })
    }
  }, [, address])

  return dataState;
}
