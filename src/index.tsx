import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import clsx from "clsx";

import Checkout from "./components/Checkout";
import Button from "./elements/Button";
import Layout from "./components/Layout";
import Modal from "./elements/Modal";
import { Footer } from "./components/Footer";
import { Donations } from "./components/Donations";
import { Navigation } from "./components/Navigation";
import { PAGE_WRAP } from "./utils/constants";
import { formatNumber } from "./utils";

import "@rainbow-me/rainbowkit/styles.css";

export default function Home() {
  const [checkoutCanvas, setCanvas] = useState(<></>)
  const [checkoutStep, setStep] = useState(0)

  const forwardStep = () => setStep(checkoutStep + 1)

  const backwardStep = () => setStep(checkoutStep - 1)

  const finalStep = () => setStep(0);

  useEffect(() => {
    switch (checkoutStep) {
      case 1:
        setCanvas(
          <Checkout.Order onDismiss={backwardStep} onClick={forwardStep} />
        );
        break;
      case 2:
        setCanvas(
          <Checkout.Receipt onDismiss={backwardStep} onClick={finalStep} />
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
      <main className={clsx(PAGE_WRAP, "min-h-screen grid grid-cols-1 items-start justify-between gap-y-10 lg:gap-y-6 md:w-4/5")}>
        <Navigation />
        <div className="h-full grid grid-cols-1 flex-start py-4 gap-6 md:gap-2 lg:gap-4 md:grid-cols-2 gap-x-36 xl:gap-x-12">
          <section className="grid grid-cols-1 flex-center gap-4 lg:gap-6">
            <div className="mx-auto text-left sm:h-auto">
              <h1 className="m-0 p-0 mb-2 text-[33px] font-bold tracking-[-.02em]">
                Fund evacuations from Gaza with crypto <br></br>
              </h1>
              <label className="text-xl font-medium text-neutral-400 pt-4">
                Crypto was made for this
              </label>
            </div>
            <div className="w-full lg:w-4/5 ml-auto grid grid-cols-2 justify-between flex-center text-center">
              <div className="grid grid-cols-1 flex-center gap-4">
                <label className="text-lg text-neutral-400 font-medium lg:text-xl">
                  Total Raised
                </label>
                <label className="text-2xl lg:text-4xl text-black font-bold">
                  + ${formatNumber(process.env.REACT_APP_PROCEEDS_AMOUNT || 0, 2)}
                </label>
                <label className="text-lg text-neutral-500">
                  {formatNumber(process.env.REACT_APP_PROCEEDS_ETH_AMOUNT || 0 / 1, 2)} ETH
                </label>
              </div>
              <div className="grid flex-center gap-4">
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
          <section className="w-full flexbox">
            <div className="card px-0 h-auto md:w-8/10 lg:w-6/10">
              {checkoutCanvas}
            </div>
          </section>
          <section className="md:mt-[-500px] lg:mt-[-700px]"><></></section>
        </div>
        <Footer />
      </main >
    </>
  );
}

ReactDOM.render(
  <Layout><Home /></Layout>,
  document.getElementById("root") || document.body
)

