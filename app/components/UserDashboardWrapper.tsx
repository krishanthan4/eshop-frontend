"use client";

import { usePathname } from "next/navigation";
import Nav from "./(Nav)/Nav";

export default function UserDashboardWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/signin", "/signup"];
  const shouldUseLayout = !noLayoutRoutes.includes(pathname);

  return <>{shouldUseLayout ? <div><Nav/>{children}</div> : <div>{children}</div>}</>;
}
