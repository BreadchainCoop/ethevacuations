"use client";

import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { DuneProvider } from '@duneanalytics/hooks';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";

import { config } from "../utils/provider";

if (!process.env.REACT_APP_DUNE_ECHO_API_KEY)
  throw new Error("DUNE_ECHO_API_KEY not provided");

const DUNE_ECHO_API_KEY = process.env.REACT_APP_DUNE_ECHO_API_KEY;

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <DuneProvider duneApiKey={DUNE_ECHO_API_KEY}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={
            lightTheme({
              accentColor: process.env.REACT_APP_SECONDARY_COLOR || '#ffd0d0'
            })}
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider >
    </DuneProvider>
  );
}
