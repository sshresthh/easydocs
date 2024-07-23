// app/layout.tsx
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "EasyDocs",
  description: "Simplified tech documentation for everyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="shipfast">
      <body className={`${inter.variable} font-sans`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
