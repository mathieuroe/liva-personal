"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const COOKIE_KEY = "liva_cookie_consent";

function setCookie(value: "accepted" | "declined") {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${COOKIE_KEY}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_KEY}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie();
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function accept() {
    setCookie("accepted");
    setVisible(false);
  }

  function decline() {
    setCookie("declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-xl">
      <div className="bg-white border border-[#E0EDE7] rounded-2xl shadow-lg px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <p className="text-xs text-gray-500 leading-relaxed flex-1">
          Wir nutzen Cookies für Analyse und Optimierung.{" "}
          <Link href="/datenschutz" className="text-brand underline underline-offset-2 hover:no-underline">
            Datenschutz
          </Link>
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={decline}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-3 py-2 rounded-xl hover:bg-gray-50"
          >
            Ablehnen
          </button>
          <button
            onClick={accept}
            className="text-xs font-semibold bg-brand text-white px-4 py-2 rounded-xl hover:bg-brand-hover transition-colors"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
