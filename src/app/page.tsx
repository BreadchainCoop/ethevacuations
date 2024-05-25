"use client";

import { useEffect, useState } from "react";
import { formatDistanceStrict } from "date-fns";
import Image from "next/image";

import { useAccountData } from "./components/useAccountData";

import { ETH_EVACUATONS_ADDRESS } from "../../constants";

export default function Home() {
  const [aggData, setAggData] = useState<Array<any>>([]);

  const { data: ethData, status: ethDataStatus } = useAccountData(
    "eth",
    ETH_EVACUATONS_ADDRESS
  );
  const { data: optimismData, status: optimismDataStatus } = useAccountData(
    "optimism",
    ETH_EVACUATONS_ADDRESS
  );
  const { data: gnosisData, status: gnosisDataStatus } = useAccountData(
    "gnosis",
    ETH_EVACUATONS_ADDRESS
  );

  useEffect(() => {
    if (
      ethDataStatus === "loading" ||
      optimismDataStatus === "loading" ||
      gnosisDataStatus === "loading"
    ) {
      return;
    }

    let combinedArray: Array<any> = [];

    if (ethDataStatus === "success")
      combinedArray = [...combinedArray, ...ethData];
    if (optimismDataStatus === "success")
      combinedArray = [...combinedArray, ...optimismData];
    if (gnosisDataStatus === "success")
      combinedArray = [...combinedArray, ...gnosisData];

    const sortedArray = combinedArray.sort((a, b) => {
      return (
        new Date(b.block_timestamp).getTime() -
        new Date(a.block_timestamp).getTime()
      );
    });

    setAggData(sortedArray);
  }, [
    ethData,
    optimismData,
    gnosisData,
    ethDataStatus,
    optimismDataStatus,
    gnosisDataStatus,
  ]);

  return (
    <>
      <header className="px-2 py-4">
        <Image src="/logo.png" alt="logo" width="40" height="40" />
      </header>
      <main className="px-4">
        <section className="grid gap-4 pb-8">
          <h1 className="text-4xl font-bold tracking-[-.02em]">
            Fund evacuations from gaza with crypto
          </h1>
          <h3 className="text-xl font-medium text-neutral-400">
            Crypto was made for this
          </h3>
          <div className="flex justify-center">
            <Image src="/qr_code.png" alt="hero" width="200" height="400" />
          </div>
          <div className="grid grid-cols-2">
            <div className="grid justify-center text-center">
              <h3 className="text-neutral-500 font-medium">Total Raised</h3>
              <span className="text-4xl text-black font-bold">$250k</span>
            </div>
            <div className="grid justify-center text-center">
              <h3 className="text-neutral-500 font-medium">People Saved</h3>
              <span className="text-4xl text-black font-bold">100</span>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold">Recent Donations</h2>

          <div>
            {aggData &&
              aggData.map((tx) => (
                <div key={`tx_${tx.hash}`} className="grid grid-cols-12 gap-4">
                  <h2 className="col-span-3">
                    {formatDistanceStrict(
                      new Date(tx.block_timestamp),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </h2>
                  <pre className="col-span-4">{tx.summary}</pre>
                </div>
              ))}
          </div>
        </section>
      </main>
    </>
  );
}
