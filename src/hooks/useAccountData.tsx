import type { DataState } from "@types";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTransactions } from '@duneanalytics/hooks';

import { CHAIN_MAP, TRUSTEE_ADDRESS, BALANCE_FROM_BLOCK } from "../utils/constants";
import { INSTANCE_SUPPORTED_CHAINS } from "../utils/provider";

export function useAccountData(
  network: keyof typeof CHAIN_MAP,
  account: string
): DataState {
  const {
    data: transactionData,
    isLoading,
    error,
    nextPage,
    previousPage,
    currentPage
  } = useTransactions(account, {
    decode: true,
    methodId: '0xa9059cbb',
    chainIds:
      INSTANCE_SUPPORTED_CHAINS
        .map(e => e.id)
        .sort((a, b) => a - b)
        .join(',')
  });

  const [dataState, setDataState] = useState<DataState>({
    status: "loading",
    data: [],
  });

  const { data } = useQuery({
    queryKey: [`accountData_${network}`],
    queryFn: () => { },
    placeholderData: keepPreviousData,
    refetchInterval: 600000,
  });

  return dataState;
}
