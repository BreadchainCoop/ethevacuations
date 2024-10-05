import Button from "./Button"
import Select from "./Select"
import Input from "./Input"

interface Props {
  onClick(): void;
  onDismiss(): void;
}

const NETWORK_SELECT_OPTIONS = [
  { id: 'eth', title: 'Ethereum', logo: '' },
  { id: 'base', title: 'Base', logo: '' },
  { id: 'op', title: 'Optimisim', logo: ''},
  { id: 'zora', title: 'Zora', logo: '' }
]

const ASSET_SELECT_OPTIONS = [
  { id: 'eth', title: 'ETH', logo: '' },
  { id: 'usdc', title: 'USDC', logo: '' },
  { id: 'wbtc', title: 'WBTC', logo: ''},
  { id: 'dai', title: 'DAI', logo: '' }
]

function CheckoutRoot({ onClick } : Props) {
  return (
    <div className="h-full flexbox gap-2 text-center p-4">
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
      <div className="text-sm text-neutral-500 lg:w-2/3,">
        This address supports tokens on Ethereum, Zora, Arbitrum, Gnosis, Optimism, and Base.
      </div>
      <div className="w-4/5 pb-6">
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

  const CheckoutButton = ({ option }: { option: number; }) => (
    <button className="border-[1px] border-black/10 bg-white rounded-[25px] lg-shadow py-2 px-4">
      <span className="float-left mr-2">
        <img  
          src="/assets/logo.png"
          className="frame h–[35px] w-[35px]"
        />
      </span>
      <span className="font-bold text-xl">{option}</span>
    </button>
  )

  return (
    <div className="h-full p-4">
      <button 
        onClick={onDismiss}
        className="absolute bg-transparent font-sans font-thin text-neutral-500 border-none text-4xl scale-x-100 scale-y-155"
      >
        &#60;
      </button>
      <div className="w-full text-center mt-[10px]">
        <label className="text-2xl font-medium">
          Donate
        </label>
      </div>
      <div className="w-full flexbox gap-3 mt-8"> 
        <div className="w-3/5">
          <div className="w-full inline-flexbox gap-4 mt-[5px]">
            <Select 
              label="Network"
              defaultValue={0}
              options={NETWORK_SELECT_OPTIONS} 
            />
            <Select 
              label="Token" 
              defaultValue={0}
              options={ASSET_SELECT_OPTIONS} 
            />
          </div>
        </div>

        <div className="w-3/5 flexbox gap-5">
          <label className="text-lg font-light text-neutral-400">
           Click for a custom amount
          </label>
          <Input.Circular title="0.00" inputType="number" />
          <span className="text-lg text-neutral-400">Balance: 0.00</span>
        </div>

        <div className="inline-flex items-center justify-center gap-3">
          {['1', '2', '5'].map((e: string) => <CheckoutButton option={e} /> )}
        </div> 

        <p>
          <span className="float-left mr-2">
            <img  
              src="/assets/logo.png"
              className="frame h–[35px] w-[35px]"
            />
          </span>
          <span className="text-right"> = One life ($0.00)</span>
        </p>

        <div className="w-2/3 pb-6">
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
    </div>
  )
}


export default {
  Root: CheckoutRoot,
  Order: CheckoutOrder
}
