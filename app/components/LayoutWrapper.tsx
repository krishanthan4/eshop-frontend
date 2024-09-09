"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/signin", "/signup","/verifyUser"];
  const shouldUseLayout = !noLayoutRoutes.includes(pathname);

  return <>{shouldUseLayout ? <div>{children}<Footer/></div> : <div>{children}</div>}</>;
}
