import { useState } from "react";

import clsx from "clsx";
import { useAccount, useSwitchChain } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import Button from "../elements/Button";
import Modal from "../elements/Modal";

import { PAGE_WRAP, NETWORK_MAP } from "../utils/constants";
import { truncateAddress } from "../utils";

export function Navigation() {
  const [showModal, setShow] = useState(false);

  const account = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();

  const dismissModal = () => setShow(false);
  const triggerModal = () => setShow(true);

  const switchNetwork = async (chainId: number) => {
    await switchChain({ chainId });
    await dismissModal();
  }

  return (
    <>
      <header className="w-full h-[52.5px] px-2 py-4 flex justify-between items-start">
        <img
          alt="logo"
          src="assets/logo.png"
          className="h-[40px] w-[40px] transform -translate-x-1.5"
        />
        <div className="inline-flex gap-5">
          {account?.address ? (
            <div className="inline-flexbox gap-2">
              <button
                onClick={triggerModal}
                className="inline-flexbox border-none bg-transparent rounded-[4rem] px-2 py-[6px] gap-3"
              >
                <img
                  className="frame h-[30px] w-[30px]"
                  src={`assets/tokens/${NETWORK_MAP[account.chain?.id || 1]}.png`}
                />
                <label className="font-medium text-[16px] mr-3 hidden md:block">{account.chain?.name}</label>
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
                className="bg-white border-none rounded-[25px] px-[10px] py-[8px]"
              >
                <img
                  alt="github"
                  src="assets/github.png"
                  className="frame block h-[30px] w-[30px]"
                />
              </a>

              <div className="">
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
      <Modal.Root
        id="network"
        isOpen={showModal}
        title="Network"
        onClose={dismissModal}
      >
        <Modal.Content>
          <ul className="flexbox w-auto md:w-[325px] border-[2px] border-solid border-secondary/20 bg-secondary/40 rounded-2xl">
            {chains.map((chain) => {
              if (chain.id === account.chain?.id) return null;

              return (
                <button
                  onClick={() => switchNetwork(chain.id)}
                  className="text-2xl md:text-lg py-3 md:py-2 hover:text-white w-full bg-transparent inline-flex border-t-none justify-center items-center border-solid border-[2px] border-secondary/50 border-r-none border-l-none last:border-b-none px-10 py-2 gap-4 last:rounded-b-2xl first:rounded-t-2xl hover:bg-primary/40"
                >
                  <img
                    src={`assets/tokens/${NETWORK_MAP[chain.id]}.png`}
                    className="h-[22px] w-[22px]"
                  />
                  <label className="capitalize">{NETWORK_MAP[chain.id]}</label>
                </button>
              )
            }
            )}
          </ul>
        </Modal.Content>
      </Modal.Root >
    </>
  );
}
