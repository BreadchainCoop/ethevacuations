import Button from "./Button"
import Select from "./Select"

interface Props {
  onClick(): void;
  onDismiss(): void;
}

function CheckoutRoot({ onClick } : Props) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-[2rem] lg:py-16 gap-4">
      <div>
        <div className="grid justify-center px-4 py-2">
          <span className="font-medium text-xl rounded-full bg-white text-black">
            ethevacuations.eth
          </span>
          <Button.Copy />
        </div>
        <div className="flex justify-center pt-4">
          <img
            alt="qr-unicode"
            src="assets/qr_code.png"
            className="block m-auto h-[190px] w-[190px]"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <img
          alt="network icons"
          src="assets/network_icons.png"
          className="block m-auto w-[127px] h-[24px]"
         />
        <p className="text-xl pt-2">Recommended networks</p>
      </div>
      <div className="w-2/3 text-sm text-neutral-500 text-center">
        This address supports tokens on Ethereum, Zora, Arbitrum, Gnosis, Optimism, and Base.
      </div>
      <div className="w-2/3">
        <Button.Primary className="text-xl" onClick={onClick}>
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

function CheckoutOrder({ onClick, onDismiss } : Props){
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-[2rem] lg:py-16 gap-4">
      <p className="text-xl font-bold">Donate</p>

      <p className="w-2/3 inline-flex items-center justify-between text-neutral-400">
        <label>Network</label>
        <label>Token</label>
      </p>

      <div className="w-2/3 inline-flex items-center justify-between">
        <Select title="Network" options={[
          'Ethereum',
          'Optimisim',
          'Zora',
          'base'
          ]} 
        />
        <Select title="Token" options={[
          'ETH',
          'USDC',
          'WBTC'
          ]} 
        />
      </div>

      <div className="w-2/3">
        <Button.Primary className="text-xl">
          <img 
            alt="btn-logo"
            src="/assets/logo.png"
            className="block float-left mr-2 h–[25px] w-[25px]"
          />
          Insert amount 
        </Button.Primary>
      </div>
    </div>
  )
}


export default {
  Root: CheckoutRoot,
  Order: CheckoutOrder
}
