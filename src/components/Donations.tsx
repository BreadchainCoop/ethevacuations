import { useEffect, useState } from "react";
import { formatDistanceStrict } from "date-fns";

import { useAccountData } from "../hooks/useAccountData";

import { TRUSTEE_ADDRESS, ASSET_TICKER_MAP, CURRENCY_MAP } from "../utils/constants";
import { truncateAddress } from "../utils/index";

export function Donations() {
  const [aggData, setAggData] = useState<Array<any>>([]);

  const { data: txs, status, mutate } = useAccountData(TRUSTEE_ADDRESS);

  return (
    <div className="">
      <p className="text-2xl font-bold mb-6">Recent Donations</p>
      <div className="w-full h-[300px] lg:h-[400px] overflow-hidden relative min-w-0">
        <div className="h-full w-full grid gap-4 overflow-y-scroll">
          {txs && txs.map((tx) =>
            <Donation key={`tx_${tx.hash}`} tx={tx} />
          )}
        </div>
      </div>
    </div>
  );
}

function Donation({ tx }: { tx: any }) {

  return (
    <div className="md:text-lg bg-white rounded-2xl px-6 py-3 flex justify-between gap-4 min-w-0">
      <div className="col-span-3 min-w-0 text-[#8b8b8b]">
        <div className="inline-flexbox gap-4">
          <img
            className="frame h-[32px] w-[32px]"
            src={`assets/tokens/${tx.chain.toLowerCase()}.png`}
          />
          <div className="w-full flexbox flex-start md:text-lg">
            <label className="font-medium">
              {formatDistanceStrict(new Date(tx.block_time), new Date(), { addSuffix: true })}
            </label>
            <label className="hidden md:block text-neutral-400">
              from {tx.logs.length ? truncateAddress(tx.logs[0].topics[1]) : truncateAddress(tx.from)}
            </label>
          </div>
        </div>
      </div>
      <div className="col-span-3 flex items-center text-xl font-medium text-success">
        {tx ? (
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
