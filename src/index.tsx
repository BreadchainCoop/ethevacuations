import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import clsx from "clsx";

import Checkout from "./components/Checkout";
import Button from "./components/Button";
import Layout from "./components/Layout";
import { Footer } from "./components/Footer";
import { Donations } from "./components/Donations";
import { Navigation } from "./components/Navigation";
import { CopyAddressButton } from "./components/CopyAddressButton";

import { ETH_EVACUATONS_ADDRESS, PAGE_WRAP } from "./utils/constants";

export default function Home() {
  const [checkoutCanvas, setCanvas] = useState(<></>) 
  const [checkoutStep, setStep] = useState(0)

  const forwardStep = () => setStep(checkoutStep+1)

  const backwardStep = () => setStep(checkoutStep-1) 

  useEffect(() => {
    switch (checkoutStep) {
      case 1:
        setCanvas(
          <Checkout.Order onDismiss={backwardStep} />
        );
        break;
      case 2: 
        setCanvas(
          <Checkout.Receipt onDismiss={backwardStep} />
        );
        break;
      default:
        setCanvas(
          <Checkout.Root onClick={forwardStep} />
        );
        break;
    }
  }, [, checkoutStep])

  return (
    <>
      <main className={clsx(PAGE_WRAP, "min-h-screen grid grid-cols-1 items-start justify-center md:w-2/3")}>
        <Navigation />
        <div className="h-full grid grid-cols-1 flex-start py-4 gap-6 md:gap-2 lg:gap-4 md:grid-cols-2 md:gap-2 md:gap-x-12 lg:gap-x-36">
          <section className="grid grid-cols-1 flex-center gap-4 lg:gap-6">
            <div className="lg:w-2/3 sm:h-auto">
              <h1 className="tracking-[-.02em]">
                Fund evacuations from Gaza with crypto <br></br>
              </h1>
              <label className="text-xl font-medium text-neutral-400 pt-4">
                Crypto was made for this
              </label>
            </div>
            <div className="w-full px-4 grid grid-cols-2 text-center">
              <div className="grid grid-cols-1 flex-start gap-6"> 
                <label className="text-lg text-neutral-400 font-medium lg:text-xl">
                  Total Raised
                </label>
                <label className="text-2xl lg:text-4xl text-black font-bold">+ $300k</label>
                <label className="text-lg text-neutral-500">0.00 ETH</label>
              </div>
              <div className="grid flex-center gap-6">
                <label className="text-lg text-neutral-400 font-medium lg:text-xl">
                  Evacuations Registered
                </label>
                <label className="text-2xl lg:text-4xl text-black font-bold">+ 60</label>
                <label className="w-full px-2 text-lg text-center text-neutral-500 flex-inline lg:text-xl">
                  <a href="">
                    <span className="float-left px-4">
                      Learn more 
                    </span>
                      <img
                        alt="link"
                        src="assets/arrow_right.png"
                        className="frame pt-[6px] h-[20px] w-[20px]"
                      />
                  </a>
                </label>
              </div>
            </div>
          </section>
          <section className="card h-auto md:h-[550px] lg:h-[600px]">{checkoutCanvas}</section>
          <section className="md:mt-[-240px] lg:mt-[-400px]"></section>
        </div>
        <Footer />
      </main>
    </>
  );
}

ReactDOM.render(
  <Layout><Home /></Layout>, 
  document.getElementById("root") || document.body
)

