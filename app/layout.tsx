import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "HandVision | Real-time gesture intelligence",
  description: "A privacy-first hand tracking interface built with Next.js, TypeScript, and Tailwind CSS.",
  metadataBase: new URL("https://handvision.example"),
  openGraph: {
    title: "HandVision",
    description: "Prototype gesture-aware user interfaces with browser-native hand tracking workflows.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
