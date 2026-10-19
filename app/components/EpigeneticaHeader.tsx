'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface EpigeneticaHeaderProps {
  children?: React.ReactNode;
}

export default function EpigeneticaHeader({ children }: EpigeneticaHeaderProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passKey, setPassKey] = useState('');
  const [message, setMessage] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    try {
      const auth = localStorage.getItem('epigenetica_therapist_auth');
      if (auth) setIsUnlocked(true);
    } catch {}

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passKey.trim().toUpperCase() === 'CYLINDER2026') {
      localStorage.setItem('epigenetica_therapist_auth', JSON.stringify({
        unlocked: true,
        license: 'CYLINDER2026',
        date: new Date().toLocaleDateString('pt-PT')
      }));
      setIsUnlocked(true);
      setMessage('Acesso Clínico Epigenética Systems Desbloqueado!');
      setTimeout(() => setShowModal(false), 1200);
    } else {
      setMessage('Chave inválida. Utilize a chave autorizada.');
    }
  };

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    } else {
      alert('Para instalar no seu computador ou telemóvel:\nNo Chrome/Edge: clique no ícone de instalar na barra de endereço ou em "Adicionar ao Ecrã Principal".');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#061316]/95 backdrop-blur-md border-b border-[#123942] shadow-lg shadow-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Marca Canónica */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-300 text-xl font-bold shadow-inner"
              title="Epigenética Systems Home"
            >
              🧬
            </Link>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold font-mono tracking-wider text-cyan-300">
                  EPIGENÉTICA SYSTEMS
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#0891B2] hidden sm:inline">
                  ·
                </span>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                  MODULAÇÃO GÊNICA & LONGEVIDADE
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  Sistema Canónico IX · Soberano
                </span>
              </div>
              <p className="text-[11px] text-[#A5F3FC]">
                Safe Creative #2610157331452 · Tecnologia Cylinder Margin
              </p>
            </div>
          </div>

          {/* Ações e Navegação Interna */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap ml-auto">
            {children}

            <Link
              href="/minicurso"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 hover:bg-cyan-500/25 text-xs font-semibold transition-all"
            >
              🎓 Minicurso Clínico
            </Link>

            <button
              onClick={handleInstallPWA}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 text-xs font-semibold transition-all"
              title="Instalar no Computador / Telemóvel"
            >
              📲 Instalar App
            </button>

            <button
              onClick={() => setShowModal(true)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                isUnlocked
                  ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                  : 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-black hover:brightness-110 shadow-cyan-500/20 font-extrabold'
              }`}
            >
              {isUnlocked ? '🔓 Desbloqueado' : '🔑 Chave Mestra'}
            </button>
          </div>
        </div>
      </header>

      {/* Modal Chave Mestra */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#0B2228] border border-cyan-500/40 rounded-3xl p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🧬</span>
                <div>
                  <h3 className="text-base font-bold text-white">Desbloqueio Epigenética Systems</h3>
                  <p className="text-xs text-[#A5F3FC]">Acesso ilimitado às Alavancas Epigenéticas e Longevidade</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#0891B2] hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A5F3FC] mb-1.5">
                  Chave Mestra Autorizada
                </label>
                <input
                  type="password"
                  placeholder="Insira CYLINDER2026"
                  value={passKey}
                  onChange={(e) => setPassKey(e.target.value)}
                  className="w-full bg-[#061316] border border-[#123942] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#155E75] focus:outline-none focus:border-cyan-400 font-mono tracking-widest text-center"
                />
              </div>

              {message && (
                <p className={`text-xs text-center font-medium ${isUnlocked ? 'text-cyan-400' : 'text-rose-400'}`}>
                  {message}
                </p>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#061316] text-[#A5F3FC] hover:text-white text-xs font-semibold transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-black text-xs font-extrabold hover:brightness-110 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  Validar Chave
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
