import { useEffect, useState } from "react";
import { formatDistanceStrict } from "date-fns";

import { useAccountData } from "../hooks/useAccountData";

import { TRUSTEE_ADDRESS, ASSET_TICKER_MAP, CURRENCY_MAP } from "../utils/constants";

export function Donations() {
  const [aggData, setAggData] = useState<Array<any>>([]);

  const { data: txs, status, mutate } = useAccountData(TRUSTEE_ADDRESS);

  console.log(txs)

  return (
    <div className="ml-6 lg:ml-22 xl:ml-52">
      <p className="text-2xl font-bold mb-6">Recent Donations</p>
      <div className="h-[320px] lg:h-[425px] overflow-hidden relative min-w-0">
        <div className="h-full grid gap-4 overflow-y-scroll">
          {txs && txs.map((tx) =>
            <Donation key={`tx_${tx.hash}`} tx={tx} />
          )}
        </div>
      </div>
      <div className="-bottom-0 left-0 right-0 h-16">
        <button onClick={mutate}>{'>>'}</button>
      </div>
    </div>
  );
}

function Donation({ tx }: { tx: any }) {

  return (
    <div className="text-lg bg-white rounded-2xl px-4 py-3 flex justify-between gap-4 min-w-0">
      <div className="col-span-3 min-w-0 text-[#8b8b8b]">
        <div className="inline-flexbox gap-4">
          <img
            className="frame h-[32px] w-[32px]"
            src={`assets/tokens/${tx.chain.toLowerCase()}.png`}
          />
          <div className="flexbox flex-start">
            <label>{formatDistanceStrict(new Date(tx.block_time), new Date(), { addSuffix: true })}</label>
            <label>
              from {tx.logs.length
                ? tx.logs[0].topics[2].substring(0, 6)
                : tx.from.substring(0, 6)
              }...
            </label>
          </div>
        </div>
      </div>
      <div className="col-span-3 flex items-center text-xl font-medium text-green/80">
        {tx.logs.length ? (
          <>
            <span>
              + {formatBalance(tx.value, 2)}
            </span>
            <span>&nbsp;{ASSET_TICKER_MAP[tx.logs[0].address]}</span>
          </>
        ) : tx ? (
          <>
            <span>
              + {formatBalance(tx.value, 4)}
            </span>
            <span>&nbsp;{CURRENCY_MAP[tx.chain] || 'ETH'}</span>
          </>
        ) : (
          "err"
        )}
      </div>
    </div>
  );
}

function formatBalance(value: number, decimals: number) {
  const balanceFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
    minimumIntegerDigits: 1,
    useGrouping: true,
  });
  return balanceFormatter.format(value / Math.pow(10, 18));
}
