// "use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "./_provider";
import { ConditionalLayout } from "../components/ConditionalLayout";
import { SidebarProvider } from "../components/ui/sidebar";
import { Toaster } from "sonner";

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
            <SidebarProvider>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </SidebarProvider>
            <Toaster />
          </QueryProvider>
        </body>
    </html>
  );
}
