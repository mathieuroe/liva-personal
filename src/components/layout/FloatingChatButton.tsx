"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

export default function FloatingChatButton() {
  const pathname = usePathname();
  if (pathname === "/chat") return null;

  return (
    <Link
      href="/chat"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-brand text-white text-sm font-semibold px-4 py-3 rounded-full shadow-lg hover:bg-brand-dark transition-colors"
    >
      <MessageCircle size={18} />
      liva
    </Link>
  );
}
