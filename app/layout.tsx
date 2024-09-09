import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import LayoutWrapper from '@/app/components/LayoutWrapper' // Import the client component
import { toast, Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeFit Corner",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[#1d1e20] text-gray-200 overflow-x-hidden">
        <LayoutWrapper>
    <Toaster richColors position="top-right"/>

          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
