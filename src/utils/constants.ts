import type { Token, Network, TokenPair, TokenPairMap, CurrencyMap } from "@types";

import JSBI from 'jsbi';

export const BALANCE_FROM_BLOCK = "19435069";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const TRUSTEE_ADDRESS = "0x8d5bf23b181ea94d3104d4192acb52427e54875a";

export const PAGE_WRAP = "font-sans max-w-[400px] mx-auto px-4 lg:max-w-6xl";

export const ERC20_ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }];

export const UNIV2_POOL_ABI = [{ "constant": true, "inputs": [], "name": "getReserves", "outputs": [{ "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, { "internalType": "uint112", "name": "_reserve1", "type": "uint112" }, { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }]

export const UNIV3_POOL_ABI = [{ "inputs": [], "name": "slot0", "outputs": [{ "internalType": "uint160", "name": "sqrtPriceX96", "type": "uint160" }, { "internalType": "int24", "name": "tick", "type": "int24" }, { "internalType": "uint16", "name": "observationIndex", "type": "uint16" }, { "internalType": "uint16", "name": "observationCardinality", "type": "uint16" }, { "internalType": "uint16", "name": "observationCardinalityNext", "type": "uint16" }, { "internalType": "uint8", "name": "feeProtocol", "type": "uint8" }, { "internalType": "bool", "name": "unlocked", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "int24", "name": "tickLower", "type": "int24" }, { "internalType": "int24", "name": "tickUpper", "type": "int24" }], "name": "snapshotCumulativesInside", "outputs": [{ "internalType": "int56", "name": "tickCumulativeInside", "type": "int56" }, { "internalType": "uint160", "name": "secondsPerLiquidityInsideX128", "type": "uint160" }, { "internalType": "uint32", "name": "secondsInside", "type": "uint32" }], "stateMutability": "view", "type": "function" }];

export const MORALIS_API_BALANCE_CALL = (address: string, network: string, block: string) => `https://deep-index.moralis.io/api/v2.2/wallets/${address}/history?chain=${network}&from_block=${block}&include_internal_transactions=false&order=DESC`;

export const ASSET_SELECT_OPTIONS: Array<Token> = [
  { id: '0x0000000000000000000000000000000000000000', chainId: '0x1', title: 'ETH', logo: 'assets/tokens/ethereum.png' },
  { id: '0x0000000000000000000000000000000000000000', chainId: '0x64', title: 'xDAI', logo: 'assets/tokens/xdai.png' },
  { id: '0x6810e776880c02933d47db1b9fc05908e5386b96', chainId: '0x1', title: 'GNO', logo: 'assets/tokens/gnosis.png' },
  { id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', chainId: '0x1', title: 'USDC', logo: 'assets/tokens/usdc.png' },
  { id: '0xdAC17F958D2ee523a2206206994597C13D831ec7', chainId: '0x1', title: 'USDT', logo: 'assets/tokens/usdt.png' },
  { id: '0xaf88d065e77c8cc2239327c5edb3a432268e5831', chainId: '0xa4b1', title: 'USDC', logo: 'assets/tokens/usdc.png' },
  { id: '0x912ce59144191c1204e64559fe8253a0e49e6548', chainId: '0xa4b1', title: 'ARB', logo: 'assets/tokens/arbitrum.png' },
  { id: '0x0000000000000000000000000000000000000000', chainId: '0xa4b1', title: 'ETH', logo: 'assets/tokens/ethereum.png' },
  { id: '0x0000000000000000000000000000000000000000', chainId: '0x2105', title: 'ETH', logo: 'assets/tokens/ethereum.png' },
  { id: '0x0000000000000000000000000000000000000000', chainId: '0x89', title: 'POL', logo: 'assets/tokens/polygon.png' },
  { id: '0x0000000000000000000000000000000000000000', chainId: '0xa', title: 'ETH', logo: 'assets/tokens/ethereum.png' },
  { id: '0x4200000000000000000000000000000000000042', chainId: '0xa', title: 'OP', logo: 'assets/tokens/optimism.png' },
  { id: '0xa555d5344f6fb6c65da19e403cb4c1ec4a1a5ee3', chainId: '0x64', title: 'BREAD', logo: 'assets/tokens/bread.png' }
];

export const NETWORK_SELECT_OPTIONS: Array<Network> = [
  { id: '0x1', title: 'Ethereum', logo: 'assets/tokens/ethereum.png' },
  { id: '0x2105', title: 'Base', logo: 'assets/tokens/base.png' },
  { id: '0xa', title: 'Optimisim', logo: 'assets/tokens/optimism.png' },
  { id: '0x89', title: 'Polygon', logo: 'assets/tokens/polygon.png' },
  { id: '0x76adf1', title: 'Zora', logo: 'assets/tokens/zora.png' },
  { id: '0xa4b1', title: 'Arbitrum', logo: 'assets/tokens/arbitrum.png' },
  { id: '0x64', title: 'Gnosis', logo: 'assets/tokens/gnosis.png' }
];

export const PAIR_MAP: TokenPairMap = {
  '0x6810e776880c02933d47db1b9fc05908e5386b96': {
    address: '0xa46466ad5507bE77Ff5aBDc27DF9dFeDA9bD7aee',
    inverted: false,
    version: '3'
  },
  '0x4200000000000000000000000000000000000042': {
    address: '0x68F5C0A2DE713a54991E01858Fd27a3832401849',
    inverted: true,
    version: '3'
  },
  '0x912ce59144191c1204e64559fe8253a0e49e6548': {
    address: '0xC6F780497A95e246EB9449f5e4770916DCd6396A',
    inverted: false,
    version: '3'
  },
  '0x0000000000000000000000000000000000000000': {
    '0x1': {
      address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
      inverted: true,
      version: '2'
    },
    '0xa': {
      address: '0x1fb3cf6e48F1E7B10213E7b6d87D4c073C7Fdb7b',
      inverted: true,
      version: '3'
    },
    '0xa4b1': {
      address: '0xC6962004f452bE9203591991D15f6b388e09E8D0',
      inverted: false,
      version: '3'
    },
    '0x2105': {
      address: '0xd0b53D9277642d899DF5C87A3966A349A798F224',
      inverted: false,
      verison: '3'
    },
    // TODO: Arbitary pricing for native derivative assets
    '0x89': {
      address: '0xA4D8c89f0c20efbe54cBa9e7e7a7E509056228D9',
      inverted: true,
      version: '3'
    }
  }
}

export const FIXED_CURRENCY_MAP: CurrencyMap = {
  '0x1': {
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': true,
    '0xdAC17F958D2ee523a2206206994597C13D831ec7': true,
  },
  '0x64': {
    '0x0000000000000000000000000000000000000000': true,
    '0xa555d5344f6fb6c65da19e403cb4c1ec4a1a5ee3': true
  },
  '0xa': {},
  '0x2105': {},
  '0xa4b1': {
    '0xaf88d065e77c8cc2239327c5edb3a432268e5831': true
  },
  '0x89': {},
  '0x76adf1': {}
}

export const CHAIN_MAP: Record<string, string> = {
  'ethereum': '0x1',
  'gnosis': '0x64',
  'polygon': '0x89',
  'optimism': '0xa',
  'base': '0x2105',
  'zora': '0x76adf1',
  'arbitrum': '0xa4b1'
};

export const NETWORK_MAP: Record<number, string> = {
  1: 'ethereum',
  100: 'gnosis',
  7777777: 'zora',
  10: 'optimism',
  137: 'polygon',
  8453: 'base',
  42161: 'arbitrum'
}

export const Q96 = JSBI.toNumber(JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(96)));

