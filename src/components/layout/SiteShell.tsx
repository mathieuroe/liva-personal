"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import FloatingChatButton from "./FloatingChatButton";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <FloatingChatButton />}
    </>
  );
}
