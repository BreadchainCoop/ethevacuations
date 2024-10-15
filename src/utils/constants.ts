export const BALANCE_FROM_BLOCK = "19435069";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const TRUSTEE_ADDRESS = "0x8d5bf23b181ea94d3104d4192acb52427e54875a";

export const UNISWAP_USDC_POOL_ADDRESS = "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc";

export const PAGE_WRAP = "font-sans max-w-[400px] mx-auto px-4 lg:max-w-6xl";

export const UNISWAP_POOL_ABI = [{ "constant": true, "inputs": [], "name": "getReserves", "outputs": [{ "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, { "internalType": "uint112", "name": "_reserve1", "type": "uint112" }, { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }]

export const NETWORK_SELECT_OPTIONS = [
  { id: 'eth', title: 'Ethereum', logo: 'assets/tokens/ethereum.png' },
  { id: 'base', title: 'Base', logo: 'assets/tokens/base.png' },
  { id: 'op', title: 'Optimisim', logo: 'assets/tokens/optimism.png' },
  { id: 'zora', title: 'Zora', logo: 'assets/tokens/zora.png' },
  { id: 'arb', title: 'Arbitrum', logo: 'assets/tokens/arbitrum.png' },
  { id: 'gno', title: 'Gnosis', logo: 'assets/tokens/gnosis.png' }
];

export const ASSET_SELECT_OPTIONS = [
  { id: 'eth', title: 'ETH', logo: 'assets/tokens/ethereum.png' },
  { id: 'gno', title: 'GNO', logo: 'assets/tokens/gnosis.png' }
];

export const MORALIS_API_BALANCE_CALL = (address: string, network: string, block: string) => `https://deep-index.moralis.io/api/v2.2/wallets/${address}/history?chain=${network}&from_block=${block}&include_internal_transactions=false&order=DESC`;

export const CHAIN_MAP = {
  eth: "0x1",
  gnosis: "0x64",
  polygon: "0x89",
  optimism: "0xa",
  base: "0x2105",
  zora: "0x76adf1",
  arbitrum: "0xa4b1"
};

export const NETWORK_MAP = {
  1: 'ethereum',
  100: 'gnosis',
  7777777: 'zora',
  10: 'optimism',
  137: 'polygon',
  8453: 'base',
  42161: 'arbitrum'
}


