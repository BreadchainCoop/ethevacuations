import { Providers } from "./components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="page-wrap min-h-screen flex justify-center items-center flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
