"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white border-t border-[#E0EDE7] px-4 py-3 shadow-lg">
      <a
        href="https://t.adcell.com/p/click?promoId=307657&slotId=149760&subId=sticky_cta_hausnotruf&param0=https%3A%2F%2Fpflegehase.de%2Fhausnotruf-bestellung%2F"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full btn-primary justify-center py-3 text-sm"
      >
        Jetzt kostenlos beantragen – dauert 3 Minuten <ArrowRight size={15} />
      </a>
    </div>
  );
}
