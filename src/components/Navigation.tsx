"use client";
import clsx from "clsx";

import Button from "../components/Button";

import { PAGE_WRAP } from "../utils/constants";

export function Navigation() {
  return (
    <header className="w-full px-2 py-4 flex justify-between items-start">
      <img
        alt="logo"
        src="assets/logo.png"
        className="h-[40px] w-[40px] transform -translate-x-1.5"
      />
      <div className="inline-flex gap-5">
        <button className="bg-white border-none w-[45px] rounded-[20px] py-[3px] px-[6px]">
          <img 
            alt="github"
            src="assets/github.png"
            className="frame h-[25px] w-[25px]"
          />
        </button>
        <div className="w-[87.5px]">
          <Button.Primary className="text-sm py-[12px] px-6">Connect</Button.Primary>
        </div> 
      </div>
    </header>
  );
}
