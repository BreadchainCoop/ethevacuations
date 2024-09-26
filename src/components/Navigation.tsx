"use client";
import clsx from "clsx";

import Button from "../components/Button";

import { WalletConnection } from "./WalletConnection";

import { PAGE_WRAP } from "../utils/constants";

export function Navigation() {
  return (
    <header className={clsx(PAGE_WRAP, "w-full md:w-2/3 px-2 py-4 flex justify-between items-start")}>
      <img
        alt="logo"
        src="assets/logo.png"
        className="h-[40px] w-[40px] transform -translate-x-1.5"
      />
      <div className="inline-flex gap-5">
        <div className="bg-white w-[40px] rounded-[20px] p-2">
          <img 
            alt="github"
            src="assets/github.png"
            className="h-[25px] w-[25px]"
          />
        </div>
        <div className="w-[87.5px]">
          <Button.Primary className="text-sm py-[12px] px-6">Connect</Button.Primary>
        </div> 
      </div>
    </header>
  );
}
