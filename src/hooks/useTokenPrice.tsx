import { useEffect, useState } from "react";
import { useReadContract } from 'wagmi';

import { UNISWAP_POOL_ABI } from "../utils/constants";
import { formatNumber } from "../utils";

type ContractCall = Array<number | string | BigInt>;

type UseReadContractReturnType = ReturnType<typeof useReadContract>;

export function useTokenPrice(address: string): number | null {
  const [tokenPrice, setTokenPrice] = useState(null);

  const formatUnits = (rX: BigInt, rY: BigInt, dX: number, dY: number): number => {
    return Number(rY / rX) * Number(Math.pow(10, (dY - dX)));
  }

  const payload: UseReadContractReturnType = useReadContract({
    abi: UNISWAP_POOL_ABI,
    functionName: 'getReserves',
    address: address
  });

  useEffect(() => {
    if (payload.data) {
      const e: ContractCall = Object.values(payload.data);
      const reservesX: BigInt = BigInt(e[0]);
      const reservesY: BigInt = BigInt(e[1]);

      setTokenPrice(formatUnits(reservesX, reservesY, 18, 6));
    }
  }, [payload])

  return tokenPrice;
}
