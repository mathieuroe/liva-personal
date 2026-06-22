"use client";

import { useState } from "react";
import { MessageCircle, X, Phone, Mail } from "lucide-react";

export default function FloatingChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Modal */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-72 card shadow-card-hover p-5 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 text-sm">Wir sind für euch da</h3>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed mb-4">
            Ihr habt eine Frage oder möchtet direkt mit uns sprechen? Meldet euch einfach.
          </p>
          <div className="space-y-2.5">
            <a href="tel:+4976188785999" className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-brand transition-colors">
              <span className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                <Phone size={14} className="text-brand" />
              </span>
              0761 88785999
            </a>
            <a href="mailto:info@liva-pflege.de" className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-brand transition-colors">
              <span className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                <Mail size={14} className="text-brand" />
              </span>
              info@liva-pflege.de
            </a>
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center shadow-lg hover:bg-brand transition-all hover:scale-105"
        aria-label="Chat öffnen"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
