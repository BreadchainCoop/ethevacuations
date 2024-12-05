import type { DataState } from "@types";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTransactions } from '@duneanalytics/hooks';

import { CHAIN_MAP, TRUSTEE_ADDRESS, BALANCE_FROM_BLOCK } from "../utils/constants";
import { INSTANCE_SUPPORTED_CHAINS } from "../utils/provider";

interface ExtendedDataState extends DataState {
  mutate: () => void;
  lastOffset: string | null | undefined;
}

const CHAIN_IDS = INSTANCE_SUPPORTED_CHAINS.map(e => e.id).sort((a, b) => a - b).join(',');

export function useAccountData(account: string): ExtendedDataState {
  const [dataState, setDataState] = useState<ExtendedDataState>({
    lastOffset: null,
    status: "loading",
    mutate: () => { },
    data: [],
  });

  const {
    data: nativeData,
    isLoading,
    error,
    nextPage: nativeNextPage,
    previousPage: nativePrevPage,
    currentPage: nativeCurrentPage
  } = useTransactions(account, { chainIds: CHAIN_IDS });

  const recievedTransactions = nativeData?.transactions
    .filter((e) => e.transaction_type !== 'Sender');

  useEffect(() => {
    if (recievedTransactions && dataState.status === 'loading') {
      const txs = recievedTransactions
        .map((tx: any) => ({
          ...tx,
          chain_id: `0x${tx.chain_id.toString(16)}`
        }));

      setDataState({
        status: 'success',
        lastOffset: nativeData?.next_offset,
        mutate: nativeNextPage,
        data: txs
      })
    }
  }, [recievedTransactions, dataState.status])

  useEffect(() => {
    if (nativeData && dataState.lastOffset) {
      if (dataState.lastOffset !== nativeData.next_offset) {
        setDataState({ ...dataState, status: 'loading' })
      }
    }
  }, [nativeData])

  return dataState;
}
