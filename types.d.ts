declare module '@types' {

  export type DataState = {
    data?: any[];
    status: 'loading' | 'success' | 'error';
  };

  export type ContractCallReturn = {
    status?: 'success' | 'failure';
    error?: undefined | Error;
    result?: undefined | ContractCallParameter | ContractCallResult;
  };

  export type ContractCallParameter = unknown | number | string | bigint | boolean;

  export type ContractCallResult = unknown | Array<ContractCallParameter>;

  export type NetworkId = '0x1' | '0xa' | '0x64' | '0x2105' | '0x76adf1' | '0xa4b1';

  export type Network = {
    id: NetworkId;
    logo: string;
    title: string;
  };

  export type Token = {
    id: string;
    title: string:
    logo: string;
    chainId: string;
  };

  export type TokenBalance = {
    value: bigint;
    symbol: string;
    decimals: number;
    formatted: string;
  }

  export type TokenPair = {
    version: '2' | '3';
    address: string;
    inverted: boolean;
  };

  export type CurrencyMap = {
    [key: string]: {
      [key: string]: boolean;
    }
  }

  export type TokenPairKey = {
    [key: NetworkId]: TokenPair;
  }

  export type TokenPairMap = {
    [key: string]?: TokenPair | TokenPairKey;
}

