import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AntdRegistry from "@/components/ui/AntdRegistry";
import AntdProvider from "@/components/ui/AntdProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hangar | Yedek Parça Esnaf Dizini",
  description:
    "Yedek parça esnaflarını bul, araç bilgilerini gir, uygun esnaflarla WhatsApp üzerinden iletişime geç.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AntdRegistry>
          <AntdProvider>{children}</AntdProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
