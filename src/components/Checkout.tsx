import type { SetStateAction, Dispatch } from "react";
import type { NetworkId, Token } from "@types";

import { useState, useEffect } from "react"
import { useSwitchChain, useAccount } from "wagmi";
import { useConnectModal } from '@rainbow-me/rainbowkit';

import { PAIR_MAP, TRUSTEE_ADDRESS, FIXED_CURRENCY_MAP, ZERO_ADDRESS, NETWORK_SELECT_OPTIONS, ASSET_SELECT_OPTIONS } from '../utils/constants';;

import { useDebounce } from "../hooks/useDebounce";
import { useTransfer } from "../hooks/useTransfer";
import { useTokenTransfer } from "../hooks/useTokenTransfer";
import { useNativeBalance } from "../hooks/useNativeBalance";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { formatNumber } from "../utils";

import Button from "../elements/Button";
import Select from "../elements/Select";
import Input from "../elements/Input";

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

function CheckoutRoot({ onClick }: Props) {
  const [hasConnected, setConnected] = useState(false);

  const account = useAccount();
  const { openConnectModal } = useConnectModal();

  const initialise = () => {
    if (!hasConnected) {
      if (openConnectModal) openConnectModal()
    } else {
      if (onClick) onClick()
    }
  }

  useEffect(() => {
    if (account.address) setConnected(true);
  }, [, account.address])

  return (
    <div className="flexbox text-center pt-8 pb-11 px-2 gap-8 lg:gap-12 xl:gap-18">
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
              className="frame md:h-[175px] md:w-[175px] lg:h-[225px] lg:w-[225px] xl:w-[250px] xl:h-[250px]"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flexbox gap-3">
          <img
            alt="network icons"
            src="assets/network_icons.png"
            className="block m-auto w-[127px] h-[24px] lg:w-[200px] lg:h-[38px]"
          />
          <label className="pt-2 lg:text-xl">Recommended networks</label>
        </div>
        <div className="w-full mx-auto mt-2 text-sm text-neutral-500 md:w-2/3">
          This address supports tokens on Ethereum, Zora, Arbitrum, Gnosis, Optimism, and Base.
        </div>
      </div>
      <div className="w-4/5">
        <Button.Primary className="text-2xl md:text-xl" onClick={initialise}>
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

function CheckoutReceipt({ onDismiss, onClick }: Props) {
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
      <div className="w-full flexbox gap-8 mt-6">
        <img
          src="assets/reciept.png"
          className="frame w-[100px] md:w-[300px] lg:w-[350px] xl:w-[500px]"
        />
        <div className="flexbox gap-4">
          <svg
            width="40"
            height="40"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="lightgreen"
              stroke-width="0"
              d="M14.1475 7.3525C14.2528 7.45797 14.312 7.60094 14.312 7.75C14.312 7.89906 14.2528 8.04203 14.1475 8.1475L8.8975 13.3975C8.79204 13.5028 8.64907 13.562 8.5 13.562C8.35094 13.562 8.20797 13.5028 8.1025 13.3975L5.8525 11.1475C5.75314 11.0409 5.69905 10.8998 5.70162 10.7541C5.70419 10.6084 5.76323 10.4693 5.86629 10.3663C5.96935 10.2632 6.10839 10.2042 6.25411 10.2016C6.39984 10.199 6.54087 10.2531 6.6475 10.3525L8.5 12.2041L13.3525 7.3525C13.458 7.24716 13.6009 7.18799 13.75 7.18799C13.8991 7.18799 14.042 7.24716 14.1475 7.3525ZM19.5625 10C19.5625 11.8913 19.0017 13.7401 17.9509 15.3126C16.9002 16.8852 15.4067 18.1108 13.6594 18.8346C11.9121 19.5584 9.9894 19.7477 8.13445 19.3788C6.27951 19.0098 4.57564 18.099 3.2383 16.7617C1.90096 15.4244 0.990216 13.7205 0.621245 11.8656C0.252274 10.0106 0.441643 8.08791 1.16541 6.34059C1.88917 4.59327 3.11482 3.09981 4.68736 2.04907C6.25991 0.998331 8.10872 0.4375 10 0.4375C12.5352 0.440477 14.9658 1.44891 16.7584 3.24158C18.5511 5.03425 19.5595 7.46478 19.5625 10ZM18.4375 10C18.4375 8.33122 17.9427 6.69992 17.0155 5.31238C16.0884 3.92484 14.7706 2.84338 13.2289 2.20477C11.6871 1.56615 9.99064 1.39906 8.35393 1.72462C6.71722 2.05019 5.2138 2.85378 4.03379 4.03379C2.85379 5.21379 2.05019 6.71721 1.72463 8.35393C1.39907 9.99064 1.56616 11.6871 2.20477 13.2289C2.84338 14.7706 3.92484 16.0884 5.31238 17.0155C6.69992 17.9426 8.33122 18.4375 10 18.4375C12.237 18.435 14.3817 17.5453 15.9635 15.9635C17.5453 14.3817 18.435 12.237 18.4375 10Z"
              fill="#0FBC00"
            />
          </svg>
          <label className="text-xl font-medium">
            Successfully donated!
          </label>
        </div>
        <ul className="w-4/5 flexbox gap-4">
          <Button.Secondary>Share on Farcaster</Button.Secondary>
          <Button.Secondary>Share on X</Button.Secondary>
          <Button.Secondary>Copy URL</Button.Secondary>
          <Button.Primary className="text-2xl md:text-xl" onClick={onClick}>
            <img
              alt="btn-logo"
              src="/assets/logo.png"
              className="block float-left mr-2 h–[25px] w-[25px]"
            />
            Donate again
          </Button.Primary>
        </ul>
      </div>
    </div>
  )
}

interface NetworkInfo {
  selectionIndex: number;
  currencyPrefix?: string
  assetOptions: Array<Token>;
  defaultAsset: number | undefined;
}

interface AssetSelection {
  default: undefined | number;
  assets: Array<Token>;
}

function CheckoutOrder({ onClick, onDismiss }: Props) {
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [selectionIndex, setSelectionIndex] = useState(0);
  const [tokenAddress, setTokenAddress] = useState<string>(ZERO_ADDRESS);
  const [currencyPrefix, setCurrencyPrefix] = useState<string | undefined>();
  const [assetSelection, setAssetSelection] = useState<AssetSelection>({ default: undefined, assets: [] });
  const [input, setInput]: [string, Dispatch<SetStateAction<string>>] = useState('');

  const account = useAccount();
  const value = useDebounce(input, 1000);
  const chainId = `0x${account.chain?.id.toString(16)}`;
  const networkId = chainId as NetworkId;

  const { switchChain } = useSwitchChain();
  const { nativeBalance } = useNativeBalance(account?.address);
  const { tokenBalance } = useTokenBalance(tokenAddress, account?.address);
  const token = useTokenTransfer(tokenAddress, TRUSTEE_ADDRESS, input);
  const native = useTransfer(TRUSTEE_ADDRESS, input);

  const x = useTokenPrice(networkId, ZERO_ADDRESS, 6);
  const y = useTokenPrice(networkId, tokenAddress, 18);
  const ethPrice = x.isInvertedPair ? Math.pow(x.tokenPrice, -1) : x.tokenPrice;
  const tokenPrice = y.isInvertedPair ? Math.pow(y.tokenPrice, -1) : y.tokenPrice;

  const checkout = tokenAddress === ZERO_ADDRESS ? native.mutate : token.mutate;

  const getNetworkInfo = (): NetworkInfo | undefined => {
    const networkOption = NETWORK_SELECT_OPTIONS.find((option) => option.id === chainId);

    if (!networkOption) return;

    const assetOptions = ASSET_SELECT_OPTIONS.filter((asset) => asset.chainId === chainId);
    const defaultAsset = assetOptions.find((asset) => asset.id === ZERO_ADDRESS);
    var defaultSelection;

    if (defaultAsset) defaultSelection = assetOptions.indexOf(defaultAsset);

    return {
      currencyPrefix: defaultAsset?.title,
      selectionIndex: NETWORK_SELECT_OPTIONS.indexOf(networkOption),
      defaultAsset: defaultSelection,
      assetOptions
    };
  };

  const shouldUpdateCurrencyPrefix = (): boolean => {
    const shouldntUpdateNative = nativeBalance.symbol === '' && currencyPrefix === nativeBalance.symbol;
    const shouldntUpdateToken = tokenBalance.symbol === '' && currencyPrefix === tokenBalance.symbol;

    if (shouldntUpdateNative || shouldntUpdateToken) return false;

    const isNativeToken = tokenAddress === ZERO_ADDRESS;
    const currentSymbolMismatch = isNativeToken
      ? nativeBalance.symbol !== currencyPrefix
      : tokenBalance.symbol !== currencyPrefix;

    return currentSymbolMismatch;
  };

  const calculateCheckoutTotal = (input: string): number => {
    const inputValue = Number(input || 0);

    if (tokenAddress === ZERO_ADDRESS) {
      return ethPrice * inputValue;
    }

    const tokenAmountPrice = tokenPrice * inputValue;
    const isFixedCurrency = FIXED_CURRENCY_MAP[chainId][tokenAddress];

    return isFixedCurrency ? tokenAmountPrice : tokenAmountPrice * ethPrice;
  };

  const calculateProceedUnitAmount = (uints: number): number => {
    const isFixedCurrency = FIXED_CURRENCY_MAP[chainId][tokenAddress];
    const uintTotalCost = Number(process.env.REACT_APP_PROCEED_UNIT || 2500) * uints;
    const selectionCost = tokenAddress === ZERO_ADDRESS ? ethPrice : tokenPrice * ethPrice;

    return isFixedCurrency ? uintTotalCost : uintTotalCost / selectionCost;
  }

  const setCheckoutAmount = (e: number) => {
    let decimals = 3;
    const isFixedCurrency = FIXED_CURRENCY_MAP[chainId][tokenAddress];

    if (isFixedCurrency) decimals = 0;
    if (tokenAddress === ZERO_ADDRESS) decimals = 4;

    setInput(formatNumber(calculateProceedUnitAmount(e), decimals))
  }

  useEffect(() => {
    if (shouldUpdateCurrencyPrefix()) {
      const newPrefix = tokenAddress === ZERO_ADDRESS
        ? nativeBalance.symbol
        : tokenBalance.symbol;
      setCurrencyPrefix(newPrefix);
    }
  }, [tokenAddress, nativeBalance.symbol, tokenBalance.symbol]);

  useEffect(() => {
    setCheckoutTotal(calculateCheckoutTotal(input));
  }, [input, ethPrice, tokenPrice, tokenAddress, chainId]);

  useEffect(() => {
    const networkInfo = getNetworkInfo();

    if (networkInfo) {
      setSelectionIndex(networkInfo.selectionIndex);
      if (networkInfo.currencyPrefix) {
        setCurrencyPrefix(networkInfo.currencyPrefix);
      }
      if (networkInfo.assetOptions) {
        setAssetSelection({
          default: networkInfo.defaultAsset,
          assets: networkInfo.assetOptions
        })
      }
    }
  }, [, account.chain?.id]);

  return (
    <div className="pt-8 pb-11 px-2 sm:px-0">
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
      <div className="w-full flexbox gap-8 mt-4">
        <div className="w-9/10 grid grid-cols-1 md:grid-cols-2 py-2 px-4 gap-4">
          <Select
            label="Network"
            options={NETWORK_SELECT_OPTIONS}
            defaultValue={NETWORK_SELECT_OPTIONS[selectionIndex || 0]}
            onSelect={(chainId: string) => switchChain({ chainId: parseInt(chainId) })}
          />
          <Select
            label="Token"
            options={assetSelection.assets}
            onSelect={(e: string) => setTokenAddress(e || ZERO_ADDRESS)}
            defaultValue={assetSelection.default || ASSET_SELECT_OPTIONS[0]}
          />
        </div>

        <div className="w-9/10 md:w-3/5 md:px-0 flexbox gap-3 mx-auto">
          <label className="lg:ml-6 text-neutral-500">
            Click for a custom amount
          </label>
          <Input.Circular
            inputType="number"
            onChange={setInput}
            prefix={currencyPrefix}
            isMobile={window.innerWidth < 600}
            value={input === '' ? null : input}
          />
          <label className="lg:ml-6 xl:ml-8 text-neutral-400">
            Balance:&nbsp;
            <span>{tokenAddress === ZERO_ADDRESS ? nativeBalance.formatted : tokenBalance.formatted}</span>
            <span>&nbsp;{currencyPrefix}</span>
          </label>
          <label className="absolute ml-4 text-lg font-bold mt-28">
            $ {formatNumber(`${checkoutTotal.toFixed(2)}`, 2)}
          </label>
        </div>

        <div className="flexbox text-center gap-3">
          <div className="inline-flex items-center justify-center gap-3">
            {[1, 2, 5].map((e: number) => (
              <CheckoutButton
                option={e}
                onClick={() => setCheckoutAmount(e)}
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
            <span className="float-center text-right font-lg"> =&nbsp;&nbsp;One life (${Number(process.env.REACT_APP_PROCEED_UNIT || 0).toLocaleString('en', { minimumFractionDigits: 0 })})</span>
          </div>
        </div>

        <div className="w-4/5">
          <Button.Primary className="text-2xl md:text-xl" onClick={checkout}>
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
