import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  CHAIN_MAP,
  MORALIS_API_BALANCE_CALL,
  TRUSTEE_ADDRESS,
  BALANCE_FROM_BLOCK
} from "../utils/constants";

interface DataState {
  status: 'loading' | 'success' | 'error';
  data: any[];
}

const MORALIS_API_KEY = process.env.REACT_APP_MORALIS_API_KEY;

if (!MORALIS_API_KEY)
  throw new Error("MORALIS_API_KEY not provided");

export function useAccountData(
  network: keyof typeof CHAIN_MAP,
  account: string
): DataState {
  const [dataState, setDataState] = useState<DataState>({
    status: "loading",
    data: [],
  });

  const fetchTransactions = () => {
    const headers: HeadersInit = new Headers();

    headers.set('Content-Type', 'application/json');
    headers.set('X-API-Key', MORALIS_API_KEY || '');

    return fetch(
      MORALIS_API_BALANCE_CALL(TRUSTEE_ADDRESS, CHAIN_MAP[network], BALANCE_FROM_BLOCK),
      {
        headers,
        method: 'GET'
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        setDataState({ status: 'error', data: [] });
      });
  };

  const { data } = useQuery({
    queryKey: [`accountData_${network}`],
    queryFn: () => fetchTransactions(),
    placeholderData: keepPreviousData,
    refetchInterval: 600000,
  });

  useEffect(() => {
    if (!data) return;

    const parsedData = data.result.length
      ? data.result
        .filter((tx: any) => {
          return (
            (tx.category === "receive" || tx.category == "token receive") &&
            !tx.possible_spam &&
            tx.block_timestamp
          );
        })
        .map((tx: any) => {
          return {
            ...tx,
            chain: network,
          };
        })
      : [];

    setDataState({ status: 'success', data: parsedData });
  }, [data, account, network]);

  return dataState;
}
