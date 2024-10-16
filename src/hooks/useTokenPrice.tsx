import { useEffect, useState } from "react";
import { useReadContract } from 'wagmi';

import { ZERO_ADDRESS, UNIV2_POOL_ABI, UNIV3_POOL_ABI, PAIR_MAP, Q96 } from "../utils/constants";
import { formatNumber, formatV2Rate, formatV3Rate } from "../utils";

type ContractCalldata = Array<number | string | BigInt>;

type UseReadContractReturnType = ReturnType<typeof useReadContract>;

export function useTokenPrice(address: keyof PAIR_MAP, decimals: number): number | null {
  const [tokenPrice, setTokenPrice] = useState<null | number>(null);

  if (!address || address === ZERO_ADDRESS) return 0;

  const pairAddress = PAIR_MAP[address].address;
  const isUniswapV2 = PAIR_MAP[address].version === '2';

  const payload: UseReadContractReturnType = useReadContract({
    abi: isUniswapV2 ? UNIV2_POOL_ABI : UNIV3_POOL_ABI,
    functionName: isUniswapV2 ? 'getReserves' : 'slot0',
    address: pairAddress
  });

  const getV3TokenPrice = (data: ContractCalldata) => {
    const sqrtPrice: BigInt = BigInt(data[0]);
    const currentTick: BigInt = BigInt(data[1]);

    return formatV3Rate(sqrtPrice);
  }

  const getV2TokenPrice = (data: ContractCalldata) => {
    const reservesX: BigInt = BigInt(data[0]);
    const reservesY: BigInt = BigInt(data[1]);

    return formatV2Rate(reservesX, reservesY, 18, decimals);
  }

  useEffect(() => {
    if (payload.data) {
      const e: ContractCalldata = Object.values(payload.data);

      if (isUniswapV2) {
        setTokenPrice(getV2TokenPrice(e));
      } else {
        setTokenPrice(getV3TokenPrice(e));
      }
    }
  }, [payload]);

  return tokenPrice;
}
