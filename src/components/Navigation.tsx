"use client";
import clsx from "clsx";
import { useConnectModal, useAccountModal } from '@rainbow-me/rainbowkit';
import { fetchBalance, getAccount } from '@wagmi/core';
import { wagmiConfig } from '../utils/wagmiConfig';

import Button from "../components/Button";

import { PAGE_WRAP } from "../utils/constants";

export function Navigation() {
  const account = getAccount(wagmiConfig);
  const { openConnectModal } = useConnectModal();

  console.log(account)

  return (
    <header className="w-full px-2 py-4 flex justify-between items-start">
      <img
        alt="logo"
        src="assets/logo.png"
        className="h-[40px] w-[40px] transform -translate-x-1.5"
      />
      <div className="inline-flex gap-5">
        <a
          target="_blank"
          href="https://github.com/breadchaincoop/ethevacuations"
          className="bg-white border-none rounded-[20px] py-[8px] px-[10px]"
        >
          <img
            alt="github"
            src="assets/github.png"
            className="frame h-[25px] w-[25px]"
          />
        </a>
        <div className="w-[87.5px]">
          <Button.Primary
            onClick={openConnectModal}
            className="text-sm py-[12px] px-6"
          >
            Connect
          </Button.Primary>
        </div>
      </div>
    </header>
  );
}
