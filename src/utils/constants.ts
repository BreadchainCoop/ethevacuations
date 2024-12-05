import type { Token, Network, TokenPair, TokenPairMap, CurrencyMap } from "@types";

import JSBI from 'jsbi';

export const BALANCE_FROM_BLOCK = "19435069";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const TRUSTEE_ADDRESS = "0x8d5bf23b181ea94d3104d4192acb52427e54875a";

export const PAGE_WRAP = "font-sans max-w-[400px] mx-auto px-4 lg:max-w-6xl";

export const ERC20_ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }];

export const UNIV2_POOL_ABI = [{ "constant": true, "inputs": [], "name": "getReserves", "outputs": [{ "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, { "internalType": "uint112", "name": "_reserve1", "type": "uint112" }, { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }]

export const UNIV3_POOL_ABI = [{ "inputs": [], "name": "slot0", "outputs": [{ "internalType": "uint160", "name": "sqrtPriceX96", "type": "uint160" }, { "internalType": "int24", "name": "tick", "type": "int24" }, { "internalType": "uint16", "name": "observationIndex", "type": "uint16" }, { "internalType": "uint16", "name": "observationCardinality", "type": "uint16" }, { "internalType": "uint16", "name": "observationCardinalityNext", "type": "uint16" }, { "internalType": "uint8", "name": "feeProtocol", "type": "uint8" }, { "internalType": "bool", "name": "unlocked", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "int24", "name": "tickLower", "type": "int24" }, { "internalType": "int24", "name": "tickUpper", "type": "int24" }], "name": "snapshotCumulativesInside", "outputs": [{ "internalType": "int56", "name": "tickCumulativeInside", "type": "int56" }, { "internalType": "uint160", "name": "secondsPerLiquidityInsideX128", "type": "uint160" }, { "internalType": "uint32", "name": "secondsInside", "type": "uint32" }], "stateMutability": "view", "type": "function" }];

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
  { id: '0xa555d5344f6fb6c65da19e403cb4c1ec4a1a5ee3', chainId: '0x64', title: 'BREAD', logo: 'assets/tokens/bread.png' },
  { id: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', chainId: '0x2105', title: 'USDC', logo: 'assets/tokens/usdc.png' },
  { id: '0x0b2c639c533813f4aa9d7837caf62653d097ff85', chainId: '0xa', title: 'USDC', logo: 'assets/tokens/usdc.png' },
  { id: '0x0000000000000000000000000000000000000000', chainId: '0x76adf1', title: 'ETH', logo: 'assets/tokens/ethereum.png' },
  { id: '0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f', chainId: '0x1', title: 'GHO', logo: 'assets/tokens/gho.png' },
  { id: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', chainId: '0x1', title: 'WBTC', logo: 'assets/tokens/wbtc.png' },
  { id: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9', chainId: '0xa4b1', title: 'USDT', logo: 'assets/tokens/usdt.png' },
  { id: '0x853d955acef822db058eb8505911ed77f175b99e', chainId: '0x1', title: 'FRAX', logo: 'assets/tokens/frax.png' },
  { id: '0x03ab458634910aad20ef5f1c8ee96f1d6ac54919', chainId: '0x1', title: 'RAI', logo: 'assets/tokens/rai.png' },
  { id: '0x6b175474e89094c44da98b954eedeac495271d0f', chainId: '0x1', title: 'DAI', logo: 'assets/tokens/dai.png' },
  { id: '0x83f20f44975d03b1b09e64809b757c47f942beea', chainId: '0x1', title: 'sDAI', logo: 'assets/tokens/sdai.png' },
  { id: '0x18084fba666a33d37592fa2633fd49a74dd93a88', chainId: '0x1', title: 'tBTC', logo: 'assets/tokens/tbtc.png' },
  { id: '0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf', chainId: '0x1', title: 'cbBTC', logo: 'assets/tokens/cbbtc.png' },
  { id: '0xbe9895146f7af43049ca1c1ae358b0541ea49704', chainId: '0x1', title: 'cbETH', logo: 'assets/tokens/cbeth.png' },
  { id: '0x68f180fcce6836688e9084f035309e29bf0a2095', chainId: '0xa', title: 'WBTC', logo: 'assets/tokens/wbtc.png' },
  { id: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f', chainId: '0xa4b1', title: 'WBTC', logo: 'assets/tokens/wbtc.png' },
  { id: '0x1debd73e752beaf79865fd6446b0c970eae7732f', chainId: '0xa4b1', title: 'cbETH', logo: 'assets/tokens/cbeth.png' }
];

export const NETWORK_SELECT_OPTIONS: Array<Network> = [
  { id: '0x1', title: 'Ethereum', logo: 'assets/tokens/ethereum.png' },
  { id: '0x2105', title: 'Base', logo: 'assets/tokens/base.png' },
  { id: '0xa', title: 'Optimisim', logo: 'assets/tokens/optimism.png' },
  { id: '0x89', title: 'Polygon', logo: 'assets/tokens/polygon.png' },
  { id: '0x76adf1', title: 'Zora', logo: 'assets/tokens/zora.png' },
  { id: '0xa4b1', title: 'Arbitrum', logo: 'assets/tokens/arbitrum.png' },
  { id: '0x64', title: 'Gnosis', logo: 'assets/tokens/gnosis.png' },
  { id: '0x89', title: 'Polygon', logo: 'assets/tokens/polygon.png' }
];

export const ASSET_TICKER_MAP: Record<string, string> = {
  '0x0000000000000000000000000000000000000000': 'ETH',
  '0x6810e776880c02933d47db1b9fc05908e5386b96': 'GNO',
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 'USDC',
  '0xdac17f958d2ee523a2206206994597c13d831ec7': 'USDT',
  '0xaf88d065e77c8cc2239327c5edb3a432268e5831': 'USDC',
  '0x912ce59144191c1204e64559fe8253a0e49e6548': 'ARB',
  '0xa555d5344f6fb6c65da19e403cb4c1ec4a1a5ee3': 'BREAD',
  '0x0000000000000000000000000000000000001010': 'POL'
};

export const CURRENCY_MAP: Record<string, string> = {
  "Gnosis": 'XDAI',
  "Polygon": 'POL'
}

export const PAIR_MAP: TokenPairMap = {
  '0x1debd73e752beaf79865fd6446b0c970eae7732f': {
    address: '0xed3fe08bd12f24dad0f1a1e58610644debe374fb',
    inverted: true,
    version: '3'
  },
  '0xbe9895146f7af43049ca1c1ae358b0541ea49704': {
    address: '0x840deeef2f115cf50da625f7368c24af6fe74410',
    inverted: true,
    version: '3'
  },
  '0xae7ab96520de3a18e5e111b5eaab095312d7fe84': {
    address: '0x4028daac072e492d34a3afdbef0ba7e35d8b55c4',
    inverted: true,
    version: '3'
  },
  '0x83f20f44975d03b1b09e64809b757c47f942beea': {
    address: '0x422a29a465e4f8acc85cee8e0c7058dff28e7196',
    inverted: false,
    version: '3'
  },
  '0x18084fba666a33d37592fa2633fd49a74dd93a88': {
    address: '0x97944213d2caeea773da1c9b11b0525f25b749cc',
    inverted: false,
    version: '3'
  },
  '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599': {
    address: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
    inverted: false,
    version: '3'
  },
  '0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf': {
    address: '0x15aa01580ae866f9ff4dbe45e06e307941d90c7b',
    inverted: false,
    version: '3'
  },
  '0x68f180fcce6836688e9084f035309e29bf0a2095': {
    address: '0x73b14a78a0d396c521f954532d43fd5ffe385216',
    inverted: false,
    version: '3'
  },
  '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f': {
    address: '0x2f5e87c9312fa29aed5c179e456625d79015299c',
    inverted: true,
    version: '3'
  },
  '0x03ab458634910aad20ef5f1c8ee96f1d6ac54919': {
    address: '0x0dc9877F6024CCf16a470a74176C9260beb83AB6',
    inverted: false,
    version: '3'
  },
  '0x6810e776880c02933d47db1b9fc05908e5386b96': {
    address: '0xa46466ad5507be77ff5abdc27df9dfeda9bd7aee',
    inverted: false,
    version: '3'
  },
  '0x4200000000000000000000000000000000000042': {
    address: '0x68f5c0a2de713a54991e01858fd27a3832401849',
    inverted: true,
    version: '3'
  },
  '0x912ce59144191c1204e64559fe8253a0e49e6548': {
    address: '0xc6f780497a95e246eb9449f5e4770916dcd6396a',
    inverted: true,
    version: '3'
  },
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': {
    address: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
    inverted: false,
    version: '2'
  },
  '0x0b2c639c533813f4aa9d7837caf62653d097ff85': {
    address: '0x1fb3cf6e48f1e7b10213e7b6d87d4c073c7fdb7b',
    inverted: true,
    version: '3'
  },
  '0xaf88d065e77c8cc2239327c5edb3a432268e5831': {
    address: '0xc6962004f452be9203591991d15f6b388e09e8d0',
    inverted: false,
    version: '3'
  },
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913': {
    address: '0xd0b53d9277642d899df5c87a3966a349a798f224',
    inverted: false,
    version: '3'
  },
  '0xcccccccc7021b32ebb4e8c08314bd62f7c653ec4': {
    address: '0xbc59f8f3b275aa56a90d13bae7cce5e6e11a3b17',
    inverted: false,
    version: '3'
  },
  '0x2791bca1f2de4661ed88a30c99a7a9449aa84174': {
    address: '0xa374094527e1673a86de625aa59517c5de346d32',
    inverted: false,
    version: '3'
  },
  '0x0000000000000000000000000000000000000000': {
    '0x1': {
      token: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
    },
    '0xa': {
      token: '0x0b2c639c533813f4aa9d7837caf62653d097ff85'
    },
    '0xa4b1': {
      token: '0xaf88d065e77c8cc2239327c5edb3a432268e5831'
    },
    '0x2105': {
      token: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913'
    },
    '0x89': {
      token: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
    },
    '0x64': {
      token: '0xa555d5344f6fb6c65da19e403cb4c1ec4a1a5ee3'
    },
    '0x76adf1': {
      token: '0xcccccccc7021b32ebb4e8c08314bd62f7c653ec4'
    }
  }
}

export const FIXED_CURRENCY_MAP: CurrencyMap = {
  '0x1': {
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': true,
    '0xdac17f958d2ee523a2206206994597c13d831ec7': true,
    '0x853d955acef822db058eb8505911ed77f175b99e': true,
    '0x6b175474e89094c44da98b954eedeac495271d0f': true,
    '0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f': true,
    '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9': true
  },
  '0x64': {
    '0x0000000000000000000000000000000000000000': true,
    '0xa555d5344f6fb6c65da19e403cb4c1ec4a1a5ee3': true
  },
  '0xa': {
    '0x0b2c639c533813f4aa9d7837caf62653d097ff85': true,
  },
  '0x2105': {
    '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913': true
  },
  '0xa4b1': {
    '0xaf88d065e77c8cc2239327c5edb3a432268e5831': true,
    '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9': true
  },
  '0x89': {
  },
  '0x76adf1': {
    '0x4200000000000000000000000000000000000006': true
  }
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

