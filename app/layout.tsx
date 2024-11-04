import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo Project",
  description: "Created by Real Dev Squad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Introducing Todo Project</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
