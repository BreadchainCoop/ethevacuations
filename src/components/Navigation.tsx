import { useState } from "react";

import { useConnectModal, useChainModal, useAccountModal } from '@rainbow-me/rainbowkit';
import { fetchBalance, getAccount } from '@wagmi/core';
import { useSwitchChain } from "wagmi";

import clsx from "clsx";
import Button from "../elements/Button";
import Modal from "../elements/Modal";

import { PAGE_WRAP, NETWORK_MAP } from "../utils/constants";
import { wagmiConfig } from '../utils/wagmiConfig';
import { truncateAddress } from "../utils";

export function Navigation() {
  const [showModal, setShow] = useState(false);

  const account = getAccount(wagmiConfig);
  const { chains, switchChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();

  const dismissModal = () => setShow(false);
  const triggerModal = () => setShow(true);

  return (
    <>
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
                onClick={triggerModal}
                className="inline-flexbox border-none bg-transparent rounded-[4rem] px-2 py-[6px] gap-3"
              >
                <img
                  className="frame h-[30px] w-[30px]"
                  src={`assets/tokens/${NETWORK_MAP[account.chain?.id || 1]}.png`}
                />
                <label className="font-medium text-[16px] mr-3">{account.chain?.name}</label>
              </button>
              <button
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
      </header>
      <Modal.Root id="network" isOpen={showModal}>
        <Modal.Header id="network" onClose={dismissModal}>Change Network</Modal.Header>
        <Modal.Content>
          <ul className="w-full flexbox gap-3">
            {chains.map((chain) =>
              <button
                onClick={() => switchChain({ chainId: chain.id })}
                className="w-full inline-flex justify-center items-center text-lg border-solid border-[2px] border-secondary rounded-[2rem] bg-white px-2 py-3 gap-4 hover:border-primary"
              >
                <img
                  src={`assets/tokens/${NETWORK_MAP[chain.id]}.png`}
                  className="h-[28px] w-[28px]"
                />
                <label className="capitalize">{NETWORK_MAP[chain.id]}</label>
              </button>
            )}
          </ul>
        </Modal.Content>
      </Modal.Root >
    </>
  );
}
