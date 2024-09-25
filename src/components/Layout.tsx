import { Providers } from "./Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="page-wrap min-h-screen flex items-center flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  );
}