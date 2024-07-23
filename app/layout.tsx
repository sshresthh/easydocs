import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-sans">{children}</body>
    </html>
  );
}
