import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Terazo - Toko Online",
  description: "Produk berkualitas untuk Anda. Jl. Dakota, Rembiga, Mataram, NTB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
