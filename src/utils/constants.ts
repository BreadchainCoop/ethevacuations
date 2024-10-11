export const BALANCE_FROM_BLOCK = "19435069";

export const TRUSTEE_ADDRESS = "0x8d5bf23b181ea94d3104d4192acb52427e54875a";

export const PAGE_WRAP = "font-sans max-w-[400px] mx-auto px-4 lg:max-w-6xl";

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

export const MORALIS_API_BALANCE_CALL = (address: string, block: string, network: string) => `https//deep-index.moralis.io/api/v2.2/wallets/${address}/history?chain=${network}&from_block=${block}&include_internal_transactions=false&order=DESC`;

export const CHAIN_MAP = {
  eth: "0x1",
  gnosis: "0x64",
  polygon: "0x89",
  optimism: "0xa",
  base: "0x2105",
  arbitrum: "0xa4b1",
};


