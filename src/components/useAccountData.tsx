import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const FROM_BLOCK = "19435069";

import { ETH_EVACUATONS_ADDRESS } from "../constants";

const chainMap = {
  eth: "0x1",
  gnosis: "0x64",
  polygon: "0x89",
  optimism: "0xa",
  base: "0x2105",
  arbitrum: "0xa4b1",
};

const MORALIS_API_KEY = process.env.REACT_APP_MORALIS_API_KEY;

console.log('API KEY', MORALIS_API_KEY)

export function useAccountData(
  chainString: keyof typeof chainMap,
  account: string
) {
  const [dataState, setDataState] = useState<{
    status: "loading" | "success" | "error";
    data: any[];
  }>({
    status: "loading",
    data: [],
  });

  const fetchTransactions = () => {
    console.log("fetching transactions...");
    return fetch(
      `https://deep-index.moralis.io/api/v2.2/wallets/${ETH_EVACUATONS_ADDRESS}/history?chain=${chainMap[chainString]}&from_block=${FROM_BLOCK}&include_internal_transactions=false&order=DESC`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": MORALIS_API_KEY,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // setCursor(data.cursor);
        return data;
      })
      .catch((err) => {
        setDataState({ status: "error", data: [] });
      });
  };

  const { data } = useQuery({
    queryKey: [`accountData_${chainString}`],
    queryFn: () => fetchTransactions(),
    placeholderData: keepPreviousData,
    refetchInterval: 2000,
  });

  useEffect(() => {
    if (!data) return;

    console.log(data)

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
              chain: chainString,
            };
          })
      : [];

    setDataState({ status: "success", data: parsedData });
  }, [data, account, chainString]);

  return dataState;
}
