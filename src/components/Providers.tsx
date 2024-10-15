"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { wagmiConfig } from "../utils/wagmiConfig";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
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
  );
}
