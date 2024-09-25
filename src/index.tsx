import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect, useState } from "react";
import { formatDistanceStrict } from "date-fns";
import clsx from "clsx";

import Button from "./components/Button";
import Layout from "./components/Layout";
import { Footer } from "./components/Footer";
import { Donations } from "./components/Donations";
import { Navigation } from "./components/Navigation";
import { CopyAddressButton } from "./components/CopyAddressButton";

import { ETH_EVACUATONS_ADDRESS, PAGE_WRAP } from "./utils/constants";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className={clsx(PAGE_WRAP, "h-full lg:pt-6")}>
        <div className="h-full grid grid-cols-1 items-start py-14 gap-2 lg:gap-4 lg:grid-cols-2 lg:gap-x-16">
          <section className="grid grid-cols-1 justify-center items-start gap-4 lg:gap-6">
            <div className="lg:w-2/3 sm:h-auto">
              <p className="text-4xl font-bold tracking-[-.02em]">
                Fund evacuations from Gaza with crypto <br></br>
              </p>
              <p className="text-xl font-medium text-neutral-400 mt-6">
                Crypto was made for this
              </p>
            </div>
            <div className="w-full px-4 py-6 grid grid-cols-2">
              <div className="grid justify-center text-center gap-2"> 
                <h3 className="text-neutral-400 font-medium text-xl">
                  Total <br className="lg:hidden" /> Raised
                </h3>
                <p className="text-4xl text-black font-bold flex items-end">+ $300k</p>
                <p className="text-lg text-neutral-500">0.00 ETH</p>
              </div>
              <div className="grid justify-center items-center text-center gap-1">
                <h3 className="text-neutral-400 font-medium text-xl">
                  Evacuations Registered
                </h3>
                <p className="text-4xl text-black font-bold">+ 60</p>
                <p className="text-lg text-neutral-500 flex-inline">
                  <a href="">
                    <p className="w-3/5 mx-auto">
                      Learn more 
                      <img
                        alt="link"
                        src="assets/arrow_right.png"
                        className="float-right mt-[3px] h-[20px] w-[20px]"
                      />
                    </p>
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-col items-center justify-center p-4 lg:bg-white lg:rounded-[2rem] lg:py-16 gap-4">
              <div>
                <div className="grid justify-center px-4 py-2">
                  <span className="font-medium text-xl rounded-full bg-white text-black">
                    ethevacuations.eth
                  </span>
                  <Button.Copy />
                </div>
                <div className="flex justify-center pt-4">
                  <img
                    alt="qr-unicode"
                    src="assets/qr_code.png"
                    className="block m-auto h-[190px] w-[190px]"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <img
                  alt="network icons"
                  src="assets/network_icons.png"
                  className="block m-auto w-[127px] h-[24px]"
                />
                <p className="text-xl pt-2">Recommended networks</p>
              </div>
              <div className="w-2/3 text-sm text-neutral-500 text-center">
                This address supports tokens on Ethereum, Zora, Arbitrum, Gnosis, Optimism, and Base.
              </div>
              <div className="w-2/3">
                <Button.Primary className="text-xl">
                  <img 
                    alt="btn-logo"
                    src="/assets/logo.png"
                    className="block float-left mr-2 h–[25px] w-[25px]"
                  />
                  Donate
                </Button.Primary>
              </div>
            </div>
          </section>

          <section className="lg:mt-[-300px]">
            {/* <Donations /> */}
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

