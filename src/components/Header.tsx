"use client";
import clsx from "clsx";

import { WalletConnection } from "./WalletConnection";

import { PAGE_WRAP } from "../utils/constants";

export function Header() {
  return (
    <header
      className={clsx(
        PAGE_WRAP,
        "w-full px-2 py-4 flex justify-between items-center"
      )}
    >
      <img
        className="transform -translate-x-1.5"
        src="/logo.png"
        alt="logo"
        width="40"
        height="40"
      />
      {/* <WalletConnection /> */}
    </header>
  );
}
