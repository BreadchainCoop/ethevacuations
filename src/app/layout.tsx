import type { Metadata } from "next";
import { Providers } from "./components/Providers";

import "@rainbow-me/rainbowkit/styles.css";

export const metadata: Metadata = {
  title: "Eth Evacuations Donation Tracker",
  description: "Crypto was made for this",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={workSans.className}>
      <div className="page-wrap flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
