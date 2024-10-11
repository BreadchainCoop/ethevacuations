import clsx from "clsx";

import Button from "../elements/Button";

export function Footer() {
  return (
    <footer className="w-full flex flex-start pt-2 pb-2">
      <p className="inline-block mt-[12px]">
        <div className="float-left">
          <img
            alt="ethevacuations"
            src="assets/logo.png"
            className="mt-[3px] mr-[10px] h-[30px] w-[30px]"
          />
        </div>
        <span className="font-bold lg:text-xl">ethevacuations</span>
      </p>
      <ul className="hidden lg:gap-8 md:inline-flex md:text-sm ">
        <li>
          <a href="">
            How does it work?
            <label className="float-right">
              <img
                alt="link"
                src="assets/arrow_right.png"
                className="mt-[3px] ml-[3px] h-[20px] w-[20px]"
              />
            </label>
          </a>
        </li>
        <li>
          <a href="">
            Who manages this?
            <label className="float-right">
              <img
                alt="link"
                src="assets/arrow_right.png"
                className="mt-[3px] ml-[3px] h-[20px] w-[20px]"
              />
            </label>
          </a>
        </li>
        <li>
          <a href="">
            Mint Gaza solidarity NFT
            <label className="float-right">
              <img
                alt="link"
                src="assets/arrow_right.png"
                className="mt-[3px] ml-[3px] h-[20px] w-[20px]"
              />
            </label>
          </a>
        </li>
        <li>
          <a href="">
            Press
            <label className="float-right">
              <img
                alt="link"
                src="assets/arrow_right.png"
                className="mt-[3px] ml-[3px] h-[20px] w-[20px]"
              />
            </label>
          </a>
        </li>

      </ul>
      <label className="flexbox gap-2">
        <span className="text-neutral-400">Hacked by</span>
        <span className="inline-block">
          <a
            href="https://twitter.com/breadchain_"
            target="_blank"
            rel="noreferrer"
            className="lg:text-lg font-bold"
          >
            <label className="float-left">
              <img
                alt="breadchain"
                src="assets/breadchain.png"
                className="mt-[3px] mr-[5px] h-[20px] w-[20px]"
              />
            </label>
            Breadchain
          </a>
        </span>
      </label>
    </footer>
  );
}
