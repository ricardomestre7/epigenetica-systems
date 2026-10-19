'use client';

import { useEffect, useState } from 'react';

export default function AntiCopyShield() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.top && window.top !== window.self) {
      try {
        window.top.location.href = window.self.location.href;
      } catch {}
    }

    const showNotice = (msg: string) => {
      setToastMessage(msg);
      const timer = setTimeout(() => setToastMessage(null), 3600);
      return () => clearTimeout(timer);
    };

    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      e.preventDefault();
      showNotice('🛡️ Conteúdo Epigenético Protegido · Safe Creative #2610157331452 · Titular: Ricardo R Pereira');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const modifier = isMac ? e.metaKey : e.ctrlKey;
      if (e.key === 'F12' || (modifier && ['s', 'S', 'u', 'U'].includes(e.key))) {
        e.preventDefault();
        showNotice('🔒 Alavancas e Redes Gênicas Protegidas · Safe Creative #2610157331452');
      }
    };

    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      const selection = window.getSelection();
      if (!selection || selection.toString().length === 0) return;
      const text = selection.toString();
      if (text.length > 25 && e.clipboardData) {
        e.preventDefault();
        const watermark = `\n\n— Fonte: Epigenética Systems · Sistema Canónico IX · Safe Creative #2610157331452\n— Titular: Ricardo R Pereira · Cylinder Margin (cylindermargin.tech)`;
        e.clipboardData.setData('text/plain', text + watermark);
        showNotice('📋 Prescrição epigenética copiada com assinatura Safe Creative');
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleCopy);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  if (!toastMessage) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-6 right-6 z-[100] max-w-sm rounded-2xl border border-cyan-500/40 bg-[#0B2228]/95 p-4 text-xs text-cyan-100 shadow-2xl backdrop-blur-xl animate-fadeIn transition-all"
    >
      <div className="flex items-start gap-3">
        <span className="text-base select-none">🧬</span>
        <div className="space-y-1">
          <p className="font-semibold text-cyan-300 tracking-wide text-[11px] uppercase">
            Propriedade Intelectual Protegida
          </p>
          <p className="text-[#A5F3FC] text-[11px] leading-relaxed">{toastMessage}</p>
          <p className="text-[9px] text-[#0891B2] pt-1">
            Safe Creative #2610157331452 · Ricardo R Pereira
          </p>
        </div>
      </div>
    </div>
  );
}
