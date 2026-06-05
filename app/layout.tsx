import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Palm Reader AI | Hand Vision IA",
  description: "Take a palm photo and receive a fun, entertainment-only AI-style palm reading.",
  metadataBase: new URL("https://hand-vision-ia.vercel.app"),
  openGraph: {
    title: "Palm Reader AI",
    description: "A premium mystical palm reading experience for entertainment.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070812"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
