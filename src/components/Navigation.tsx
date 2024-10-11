import { useConnectModal, useChainModal, useAccountModal } from '@rainbow-me/rainbowkit';
import { fetchBalance, getAccount } from '@wagmi/core';
import clsx from "clsx";

import { wagmiConfig } from '../utils/wagmiConfig';

import Button from "../components/Button";

import { PAGE_WRAP, NETWORK_MAP } from "../utils/constants";
import { truncateAddress } from "../utils";

export function Navigation() {
  const account = getAccount(wagmiConfig);
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  return (
    <header className="w-full h-[52.5px] px-2 py-4 flex justify-between items-start">
      <img
        alt="logo"
        src="assets/logo.png"
        className="h-[40px] w-[40px] transform -translate-x-1.5"
      />
      <div className="inline-flex gap-5">
        {account?.address && account.chain?.id !== 7777777 ? (
          <div className="inline-flexbox gap-2">
            <button
              onClick={openChainModal}
              className="inline-flexbox border-none bg-transparent rounded-[4rem] px-2 py-[6px] gap-3"
            >
              <img
                className="frame h-[30px] w-[30px]"
                src={`assets/tokens/${NETWORK_MAP[account.chain?.id || 1]}.png`}
              />
              <label className="font-medium text-[16px] mr-3">{account.chain?.name}</label>
            </button>
            <button
              onClick={openAccountModal}
              className="border-none font-medium text-[16px] inline-flexbox bg-white rounded-[4rem] px-2 py-[6px] gap-3"
            >
              <div className="bg-primary/20 p-1 rounded-[3rem] p-[6px]">
                <img
                  alt="account-icon"
                  src="assets/logo.png"
                  className="frame h-[24px] w-[24px]"
                />
              </div>
              <label className="leading-[16px] mr-4">{truncateAddress(account.address)}</label>
            </button>
          </div>
        ) : (
          <>
            <a
              target="_blank"
              href="https://github.com/breadchaincoop/ethevacuations"
              className="bg-white border-none rounded-[20px] py-[8px] px-[10px]"
            >
              <img
                alt="github"
                src="assets/github.png"
                className="frame block h-[25px] w-[25px]"
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
          </>
        )}
      </div>
    </header >
  );
}
