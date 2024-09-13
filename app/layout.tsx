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
 
  function payHereURL(){
    if (process && process.env.NODE_ENV == "production")
      return '/payhere.js';
    else
      return '/payhere.dev.js';
  }
  

  return (
    <html lang="en" className="h-full">
      <head>
      <script src={payHereURL()}></script>
      </head>
      <body className="h-full bg-[#1d1e20] text-gray-200 overflow-x-hidden">
        <LayoutWrapper>
    <Toaster duration={3000} closeButton visibleToasts={1} richColors position="top-right"/>
          {children}
        </LayoutWrapper>
        <script type="text/javascript" src="https://www.payhere.lk/lib/payhere.js"></script>
        </body>
    </html>
  );
}
