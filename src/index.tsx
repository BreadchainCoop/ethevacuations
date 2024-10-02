import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import clsx from "clsx";

import Checkout from "./components/Checkout"
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
          <Checkout.Order />
        );
        break;
      default:
        setCanvas(
          <Checkout.Root 
            onClick={forwardStep} 
          />);
        break;
    }
  }, [, checkoutStep])

  return (
    <>
      <main className={clsx(PAGE_WRAP, "md:w-2/3 min-h-screen lg:pt-6 grid grid-cols-1 justify-between")}>
        <Navigation />
        <div className="h-full grid grid-cols-1 justify-between items-start py-6 lg:py-14 gap-6 md:gap-2 lg:gap-4 md:gap-x-12 md:grid-cols-2 lg:gap-x-36">
          <section className="grid grid-cols-1 justify-center items-start gap-4 lg:gap-6">
            <div className="lg:w-2/3 sm:h-auto">
              <p className="text-2xl lg:text-4xl font-bold tracking-[-.02em]">
                Fund evacuations from Gaza with crypto <br></br>
              </p>
              <p className="text-xl font-medium text-neutral-400 mt-6">
                Crypto was made for this
              </p>
            </div>
            <div className="w-full px-4 lg:py-6 grid grid-cols-2">
              <div className="grid justify-center text-center gap-2"> 
                <h3 className="text-neutral-400 font-medium lg:text-xl">
                  Total <br className="md:hidden lg:hidden" /> Raised
                </h3>
                <p className="text-2xl lg:text-4xl text-black font-bold flex items-end">+ $300k</p>
                <p className="lg:text-lg text-neutral-500">0.00 ETH</p>
              </div>
              <div className="grid justify-center items-center text-center gap-1">
                <h3 className="text-neutral-400 font-medium lg:text-xl">
                  Evacuations Registered
                </h3>
                <p className="text-2xl lg:text-4xl text-black font-bold">+ 60</p>
                <p className="lg:text-lg text-neutral-500 flex-inline">
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
          <section className="h-[465px] rounded-[2rem] bg-white px-6 py-8 lg:py-16">{checkoutCanvas}</section>
          <section className="md:mt-[-240px] lg:mt-[-300px]"><Donations /></section>
        </div>
        <Footer />
      </main>
    </>
  );
}

ReactDOM.render(
  <Layout>
    <Home />
  </Layout>, 
   document.getElementById("root") || document.body
)

