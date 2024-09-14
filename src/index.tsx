import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect, useState } from "react";

import { formatDistanceStrict } from "date-fns";
import { useAccountData } from "./components/useAccountData";

import { ETH_EVACUATONS_ADDRESS } from "./constants";
import clsx from "clsx";

import { Footer } from "./components/Footer";
import Layout from "./layout";
import { Header } from "./components/Header";
import { CopyAddressButton } from "./components/CopyAddressButton";
import { Donations } from "./components/Donations";

import { PAGE_WRAP } from "./util";

export default function Home() {
  return (
    <>
      <header className={clsx(PAGE_WRAP, "w-full px-2 py-4")}>
        <img
          className="transform -translate-x-1.5"
          src="/logo.png"
          alt="logo"
          width="40"
          height="40"
        />
      </header>
      <main className={clsx(PAGE_WRAP, "h-full lg:pt-6")}>
        <p className="w-full sm:h-auto text-4xl font-bold tracking-[-.02em]">
          Fund evacuations from Gaza with crypto <br></br>
          <span className="w-full sm:h-auto text-xl font-medium text-neutral-400">
            Crypto was made for this
          </span>
        </p>
        <div className="h-full grid grid-cols-1 justify-center py-4 gap-4 lg:grid-cols-2 lg:gap-x-16">
          <section className="grid grid-cols-1 justify-between items-center col-span-1 col-start-1 lg:pb-0">
            <div
              style={{ 
                borderRadius: '30px',
                padding: '40px 25px'
              }} 
              className="w-full bg-white grid grid-cols-2"
            >
              <div className="grid justify-center text-center gap-1"> 
                <h3 className="text-neutral-500 font-medium text-xl">
                  Total
                  <br className="lg:hidden" /> Raised
                </h3>
                <span className="text-4xl text-black font-bold flex items-end">
                  + $300k
                </span>
              </div>
              <div className="grid justify-center text-center gap-1">
                <h3 className="text-neutral-500 font-medium text-xl">
                  Evacuations Registered
                </h3>
                <span className="text-4xl text-black font-bold">+ 60</span>
              </div>
            </div>
          </section>

          <section>
            <div className="lg:bg-white lg:rounded-[2rem] flex items-center justify-center lg:py-16">
              <div>
                <div className="grid justify-center">
                  <span className="px-4 py-2 font-medium text-xl rounded-full bg-white text-black">
                    ethevacuations.eth
                  </span>
                  <CopyAddressButton />
                </div>
                <div className="flex justify-center pt-4">
                  <img
                    src="/qr_code.png"
                    alt="hero"
                    width="190"
                    height="189"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mt-5">
              <h2 className="text-2xl font-bold">Recent Donations</h2>
              <div>
                <img
                  src="/network_icons.png"
                  alt="network icons"
                  width="84"
                  height="25"
                />
              </div>
            </div>
            <Donations />
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}

ReactDOM.render(
  <Layout>
    <Home />
  </Layout>, 
   document.getElementById("root") || document.body
)

