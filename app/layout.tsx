// "use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "./_provider";
import { SideBar } from "@/components/SideBar";
import { NavBar } from "@/components/NavBar";
import { ConditionalLayout } from "../components/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

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
    <html lang="en" className={inter.className}>
      <head>
        <title>Introducing Todo Project</title>
      </head>
      
        <body>
          <QueryProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </QueryProvider>
        </body>
    </html>
  );
}
