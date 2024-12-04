import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  gnosis,
  sepolia
} from "wagmi/chains";
import { http, createConfig } from "wagmi";
import { walletConnect, injected } from 'wagmi/connectors'

const WALLET_CONNECT_PROJECT_ID = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID

if (!WALLET_CONNECT_PROJECT_ID)
  throw new Error("WALLET_CONNECT_PROJECT_ID not provided");

export const INSTANCE_SUPPORTED_CHAINS = [mainnet, optimism, arbitrum, polygon, base, gnosis, zora];

export const config = createConfig({
  chains: [mainnet, optimism, arbitrum, polygon, base, gnosis, zora],
  connectors: [
    injected(),
    walletConnect({ projectId: WALLET_CONNECT_PROJECT_ID })
  ],
  transports: {
    [mainnet.id]: http(process.env.REACT_APP_ETH_RPC),
    [optimism.id]: http(process.env.REACT_APP_OP_RPC),
    [arbitrum.id]: http(process.env.REACT_APP_ARB_RPC),
    [polygon.id]: http(process.env.REACT_APP_POLY_RPC),
    [base.id]: http(process.env.REACT_APP_BASE_RPC),
    [gnosis.id]: http(process.env.REACT_APP_GNO_RPC),
    [zora.id]: http(process.env.REACT_APP_ZORA_RPC)
  }
});
