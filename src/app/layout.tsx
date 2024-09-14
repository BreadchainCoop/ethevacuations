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
    <html lang="en">
      <script
        defer
        data-domain="ethevacuations.breadchain.xyz"
        src="https://analytics.breadchain.xyz/js/script.js"
      ></script>

      <body className={workSans.className}>
        {/* <Providers> */}
        <div className="page-wrap flex flex-col min-h-screen">{children}</div>
        {/* </Providers> */}
      </body>
    </html>
  );
}
