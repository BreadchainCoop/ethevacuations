import Button from "./Button"
import Select from "./Select"
import Input from "./Input"

interface Props {
  onClick(): void;
  onDismiss(): void;
}

function CheckoutRoot({ onClick } : Props) {
  return (
    <div className="h-full flexbox gap-4 text-center">
      <div>
        <div className="grid justify-center px-4 py-2">
          <span className="font-medium text-lg rounded-full bg-white text-black lg:text-xl">
            ethevacuations.eth
          </span>
          <Button.Copy />
        </div>
        <div className="pt-4">
          <img
            alt="qr-unicode"
            src="assets/qr_code.png"
            className="frame h-[125px] w-[125px] lg:h-[190px] lg:w-[190px]"
          />
        </div>
      </div>
      <div className="flexbox gap-1">
        <img
          alt="network icons"
          src="assets/network_icons.png"
          className="block m-auto w-[127px] h-[24px]"
         />
        <label className="pt-2 lg:text-xl">Recommended networks</label>
      </div>
      <div className="text-sm text-neutral-500 lg:w-4/5">
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
    <div className="h-full flexbox gap-4"> 
      <h3 className="text-xl font-bold">Donate</h3>

      <div className="w-4/5">
        <p className="w-full inline-flexbox text-left font-medium text-neutral-400">
          <label className="w-full">Network</label>
          <label className="w-full">Token</label>
        </p>

        <div className="mt-[5px] inline-flexbox gap-4">
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

      <div className="w-4/5 flexbox gap-6">
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
