import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/Providers";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
