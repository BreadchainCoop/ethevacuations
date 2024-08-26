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
          <div className="page-wrap flex flex-col min-h-screen">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
