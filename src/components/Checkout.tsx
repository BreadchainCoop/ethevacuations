import type { SetStateAction } from "react"
import { useState, useEffect } from "react"
import { fetchBalance, getAccount } from '@wagmi/core';
import { useSwitchChain } from "wagmi";

import { PAIR_MAP, FIXED_CURRENCY_MAP, ZERO_ADDRESS, NETWORK_SELECT_OPTIONS, ASSET_SELECT_OPTIONS } from '../utils/constants';

import Button from "../elements/Button";
import Select from "../elements/Select";
import Input from "../elements/Input";

import { useDebounce } from "../hooks/useDebounce";
import { useNativeBalance } from "../hooks/useNativeBalance";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { wagmiConfig } from "../utils/wagmiConfig";
import { formatNumber } from "../utils";

type TokenAddress = keyof typeof PAIR_MAP;

interface Props {
  onClick?(): void;
  onDismiss?(): void;
}

type Option = {
  id: string;
  chainId: string;
  title: string;
  logo: string;
}

function CheckoutRoot({ onClick }: Props) {
  return (
    <div className="flexbox text-center pt-8 pb-11 px-2 gap-8 lg:gap-24">
      <div>
        <div className="grid justify-center px-4 py-2">
          <span className="font-medium text-xl rounded-full bg-white text-black">
            ethevacuations.eth
          </span>
          <Button.Copy />
          <div className="pt-4">
            <img
              alt="qr-unicode"
              src="assets/qr_code.png"
              className="frame h-[225px] w-[225px] lg:h-[300px] lg:w-[300px]"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flexbox gap-3">
          <img
            alt="network icons"
            src="assets/network_icons.png"
            className="block m-auto w-[127px] h-[24px]"
          />
          <label className="pt-2 lg:text-xl">Recommended networks</label>
        </div>
        <div className="w-full mx-auto mt-2 text-sm text-neutral-500 md:w-2/3,">
          This address supports tokens on Ethereum, Zora, Arbitrum, Gnosis, Optimism, and Base.
        </div>
      </div>
      <div className="w-4/5">
        <Button.Primary className="text-2xl md:text-xl" onClick={onClick}>
          <img
            alt="btn-logo"
            src="/assets/logo.png"
            className="block float-left mr-2 h–[25px] w-[25px]"
          />
          Donate
        </Button.Primary>
      </div>
    </div>
  )
}

function CheckoutReceipt({ onDismiss }: Props) {
  return (
    <div className="pt-8 pb-11 px-2">
      <div className="mt-[-15px] mb-[25px]">
        <button
          onClick={onDismiss}
          className="absolute bg-transparent font-sans font-light text-neutral-300 border-none text-4xl scale-x-90 scale-y-155"
        >
          &#60;
        </button>
        <div className="w-full text-center pt-[8px]">
          <label className="text-2xl font-medium">
            Spread the action
          </label>
        </div>
      </div>
      <div className="w-full flexbox gap-3 mt-4">
      </div>
    </div>
  )
}

function CheckoutOrder({ onClick, onDismiss }: Props) {
  const [input, setInput] = useState('');
  const [selectionIndex, setSelectionIndex] = useState(0);
  const [tokenAddress, setTokenAddress] = useState<TokenAddress>(ZERO_ADDRESS);

  const value = useDebounce(input, 1000);
  const account = getAccount(wagmiConfig);
  const chainId = `0x${account.chain?.id.toString(16)}`;

  const { switchChain } = useSwitchChain();
  const { nativeBalance } = useNativeBalance(account?.address);
  const { tokenBalance } = useTokenBalance(tokenAddress, account?.address);

  const usdcPrice = useTokenPrice(chainId, ZERO_ADDRESS, 6);
  const selectedPrice = useTokenPrice(chainId, tokenAddress, 18);
  const ethPrice = usdcPrice.isInvertedPair ? Math.pow(usdcPrice.tokenPrice, -1) : usdcPrice.tokenPrice;
  const tokenPrice = selectedPrice.isInvertedPair ? Math.pow(selectedPrice.tokenPrice, -1) : selectedPrice.tokenPrice;

  const CheckoutButton = ({
    option,
    onClick
  }: {
    option: number;
    onClick?(): void;
  }) => (
    <button
      onClick={onClick}
      className="border-[1px] border-black/10 bg-white rounded-[25px] shadow-2xl py-2 px-4 hover:bg-secondary/80 hover:translate-y-[-5px]"
    >
      <span className="float-left mr-2">
        <img
          src="/assets/logo.png"
          className="frame h–[35px] w-[35px]"
        />
      </span>
      <span className="font-bold text-xl">{option}</span>
    </button>
  )

  useEffect(() => {
    const i = NETWORK_SELECT_OPTIONS.find((e) => e.id === chainId);

    if (i) {
      setSelectionIndex(NETWORK_SELECT_OPTIONS.indexOf(i));
    }
  }, [, selectionIndex, account.chain?.id])

  const inputValue = isNaN(Number(input)) ? 0 : Number(input);

  return (
    <div className="pt-8 pb-11 px-2">
      <div className="mt-[-15px] mb-[25px]">
        <button
          onClick={onDismiss}
          className="absolute bg-transparent font-sans font-light text-neutral-300 border-none text-4xl scale-x-90 scale-y-155"
        >
          &#60;
        </button>
        <div className="w-full text-center pt-[8px]">
          <label className="text-2xl font-medium">
            Donate
          </label>
        </div>
      </div>
      <div className="w-full flexbox gap-8 mt-4 lg:gap-18">
        <div className="w-9/10 md:w-7/10 grid grid-cols-1 md:grid-cols-2 py-2 px-4 gap-4">
          <Select
            label="Network"
            defaultValue={selectionIndex}
            options={NETWORK_SELECT_OPTIONS}
            onSelect={(chainId: string) => switchChain(chainId)}
          />
          <Select
            label="Token"
            defaultValue={0}
            onSelect={(e: TokenAddress) => setTokenAddress(e)}
            options={ASSET_SELECT_OPTIONS.filter((e) => e.chainId === chainId)}
          />
        </div>

        <div className="w-8/10 md:w-3/5 md:px-0 flexbox gap-3">
          <label className="text-neutral-500">
            Click for a custom amount
          </label>
          <Input.Circular
            title="0.00"
            value={input}
            inputType="number"
            onChange={setInput}
          />
          <label className="text-neutral-400">
            Balance:&nbsp;
            <span>{tokenAddress === ZERO_ADDRESS ? nativeBalance.formatted : tokenBalance.formatted}</span>
            <span>&nbsp;{tokenAddress === ZERO_ADDRESS ? nativeBalance.symbol : tokenBalance.symbol}</span>
          </label>
          <label className="absolute mr-6 text-lg font-bold mt-28">
            $ {formatNumber(tokenAddress !== ZERO_ADDRESS
              ? (FIXED_CURRENCY_MAP[chainId][tokenAddress] ? tokenPrice * inputValue : tokenPrice * ethPrice * inputValue)
              : ethPrice * inputValue
              , 2)}
          </label>
        </div>

        <div className="flexbox text-center gap-3">
          <div className="inline-flex items-center justify-center gap-3">
            {[1, 2, 5].map((e: number) => (
              <CheckoutButton
                option={e}
                onClick={() => setInput(formatNumber(e, 3))}
              />
            ))}
          </div>
          <div className="inline-flexbox">
            <span className="float-center mr-2">
              <img
                src="/assets/logo.png"
                className="frame h–[35px] w-[35px]"
              />
            </span>
            <span className="float-center text-right font-lg"> =&nbsp;&nbsp;One life ($0.00)</span>
          </div>
        </div>

        <div className="w-4/5">
          <Button.Primary className="text-2xl md:text-xl">
            <img
              alt="btn-logo"
              src="/assets/logo.png"
              className="block float-left mr-2 h–[25px] w-[25px]"
            />
            Confirm
          </Button.Primary>
        </div>
      </div>
    </div>
  )
}


export default {
  Root: CheckoutRoot,
  Receipt: CheckoutReceipt,
  Order: CheckoutOrder
}
