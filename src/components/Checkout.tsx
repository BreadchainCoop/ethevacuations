import Button from "./Button"
import Select from "./Select"
import Input from "./Input"

interface Props {
  onClick(): void;
  onDismiss(): void;
}

function CheckoutRoot({ onClick } : Props) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <div>
        <div className="grid justify-center px-4 py-2">
          <span className="font-medium text-lg lg:text-xl rounded-full bg-white text-black">
            ethevacuations.eth
          </span>
          <Button.Copy />
        </div>
        <div className="flex justify-center pt-4">
          <img
            alt="qr-unicode"
            src="assets/qr_code.png"
            className="block m-auto h-[125px] w-[125px] lg:h-[190px] lg:w-[190px]"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <img
          alt="network icons"
          src="assets/network_icons.png"
          className="block m-auto w-[127px] h-[24px]"
         />
        <p className="lg:text-xl pt-2">Recommended networks</p>
      </div>
      <div className="lg:w-4/5 text-sm text-neutral-500 text-center">
        This address supports tokens on Ethereum, Zora, Arbitrum, Gnosis, Optimism, and Base.
      </div>
      <div className="w-4/5">
        <Button.Primary className="lg:text-xl" onClick={onClick}>
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
    <div className="h-full flex flex-col items-center justify-between bg-white rounded-[2rem] gap-4"> 
      <p className="text-xl font-bold">Donate</p>

      <div className="w-4/5">
        <p className="w-full inline-flex items-start text-left font-medium justify-between text-neutral-400">
          <p className="w-full">Network</p>
          <p className="w-full">Token</p>
        </p>

        <div className="mt-[5px] inline-flex items-center justify-between gap-4">
          <Select 
            title="Network"
            defaultValue="Ethereum"
            options={[ 'Ethereum', 'Optimisim', 'Zora', 'Base' ]} 
          />
          <Select 
            title="Token" 
            defaultValue="ETH"
            options={[ 'ETH', 'USDC', 'WBTC' ]} 
          />
        </div>
      </div>

      <div className="w-4/5 grid grid-cols gap-2">
        <label className="text-center text-neutral-400">
          Click for a custom amount
        </label>
        <Input.Circular title="0.00" inputType="number" />
      </div>

      <div className="w-2/3">
        <Button.Primary className="lg:text-xl">
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
