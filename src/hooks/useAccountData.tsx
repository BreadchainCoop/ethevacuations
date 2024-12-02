import type { DataState } from "@types";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTransactions } from '@duneanalytics/hooks';

import { CHAIN_MAP, TRUSTEE_ADDRESS, BALANCE_FROM_BLOCK } from "../utils/constants";
import { INSTANCE_SUPPORTED_CHAINS } from "../utils/provider";

interface ExtendedDataState extends DataState {
  mutate: () => void;
  lastOffset: string | null;
}

export function useAccountData(account: string): ExtendedDataState {
  const [dataState, setDataState] = useState<ExtendedDataState>({
    lastOffset: null,
    status: "loading",
    mutate: () => { },
    data: [],
  });

  const {
    data,
    isLoading,
    error,
    nextPage,
    previousPage,
    currentPage
  } = useTransactions(account, {
    decode: true,
    chainIds: INSTANCE_SUPPORTED_CHAINS.map(e => e.id).sort((a, b) => a - b).join(',')
  });

  const recievedTransactions = data?.transactions
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
        lastOffset: data?.next_offset,
        mutate: nextPage,
        data: txs
      })
    }
  }, [recievedTransactions, dataState.status])

  useEffect(() => {
    if (data && dataState.lastOffset) {
      if (dataState.lastOffset !== data.next_offset) {
        setDataState({ ...dataState, status: 'loading' })
      }
    }
  }, [data])

  return dataState;
}
