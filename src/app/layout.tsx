import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
// import { Providers } from "./components/Providers";

import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

const workSans = Work_Sans({ subsets: ["latin"] });

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
