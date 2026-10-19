'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import EpigeneticaFrequencyPlayer from '../components/EpigeneticaFrequencyPlayer';

export default function MinicursoEpigeneticaPage() {
  const [activeTab, setActiveTab] = useState<'modulo1' | 'modulo2' | 'modulo3' | 'certificado'>('modulo1');
  const [alunoNome, setAlunoNome] = useState('');
  const [notasEstudo, setNotasEstudo] = useState('');
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  useEffect(() => {
    try {
      const savedNotas = localStorage.getItem('minicurso_epigenetica_notas');
      if (savedNotas) setNotasEstudo(savedNotas);
      const savedAluno = localStorage.getItem('minicurso_epigenetica_aluno');
      if (savedAluno) setAlunoNome(savedAluno);
    } catch {}
  }, []);

  const handleSalvarNotas = () => {
    try {
      localStorage.setItem('minicurso_epigenetica_notas', notasEstudo);
      localStorage.setItem('minicurso_epigenetica_aluno', alunoNome);
      alert('Notas guardadas no seu dispositivo com sucesso!');
    } catch {}
  };

  const handleGerarCertificado = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alunoNome.trim()) {
      alert('Por favor, digite o seu nome completo para o certificado.');
      return;
    }
    handleSalvarNotas();
    setActiveTab('certificado');
  };

  return (
    <div className="min-h-screen bg-[#061316] text-[#E6FFFA] flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <header className="sticky top-0 z-40 bg-[#0B2228]/90 backdrop-blur-md border-b border-[#123942] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold flex items-center gap-1.5"
            >
              ← Voltar ao Epigenética Systems
            </Link>
            <span className="text-xs text-[#123942]">/</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#A5F3FC]">
              MINICURSO DE MODULAÇÃO GÊNICA & LONGEVIDADE
            </span>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
            Sistema Canónico IX · Safe Creative #2610157331452
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 flex-1 space-y-8 w-full">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full">
            Formação Clínica Soberana · Epigenética Systems
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Modulação da Expressão Gênica, Alavancas Epigenéticas & Longevidade
          </h1>
          <p className="text-xs sm:text-sm text-[#A5F3FC] leading-relaxed">
            Compreenda a metilação do DNA, a acetilação de histonas, as 12 alavancas de estilo de vida que reprogramam a biologia e a aplicação de frequências celulares para desacelerar o relógio epigenético de Horvath.
          </p>
        </div>

        <EpigeneticaFrequencyPlayer />

        <div className="flex border-b border-[#123942] gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('modulo1')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all shrink-0 ${
              activeTab === 'modulo1'
                ? 'bg-[#0B2228] text-cyan-300 border-t-2 border-cyan-400'
                : 'text-[#A5F3FC] hover:text-white'
            }`}
          >
            Módulo 1: O Livro e o Lápis (DNA x Epigenoma)
          </button>
          <button
            onClick={() => setActiveTab('modulo2')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all shrink-0 ${
              activeTab === 'modulo2'
                ? 'bg-[#0B2228] text-cyan-300 border-t-2 border-cyan-400'
                : 'text-[#A5F3FC] hover:text-white'
            }`}
          >
            Módulo 2: As 12 Alavancas Epigenéticas Práticas
          </button>
          <button
            onClick={() => setActiveTab('modulo3')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all shrink-0 ${
              activeTab === 'modulo3'
                ? 'bg-[#0B2228] text-cyan-300 border-t-2 border-cyan-400'
                : 'text-[#A5F3FC] hover:text-white'
            }`}
          >
            Módulo 3: Protocolos de Longevidade Soberana
          </button>
          <button
            onClick={() => setActiveTab('certificado')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all shrink-0 ${
              activeTab === 'certificado'
                ? 'bg-[#0B2228] text-cyan-300 border-t-2 border-cyan-400'
                : 'text-[#A5F3FC] hover:text-white'
            }`}
          >
            📜 Certificado Safe Creative
          </button>
        </div>

        {activeTab === 'modulo1' && (
          <div className="space-y-6 bg-[#0B2228] p-6 rounded-2xl border border-[#123942]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🧬</span> O DNA é o Texto; a Epigenética é a Leitura Dinâmica
            </h2>
            <div className="space-y-3 text-xs text-[#A5F3FC] leading-relaxed">
              <p>
                O genoma humano é praticamente imutável ao longo da vida adulta, mas o epigenoma altera-se a cada minuto em resposta ao sono, luz solar, nutrição, pensamentos e toxicidade ambiental. A metilação de ilhas CpG silencia oncogenes ou, se hipermetilada erroneamente, silencia genes supressores de tumor.
              </p>
            </div>

            <label className="flex items-center gap-3 p-3 bg-[#061316] rounded-xl border border-[#123942] cursor-pointer">
              <input
                type="checkbox"
                checked={check1}
                onChange={(e) => setCheck1(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded"
              />
              <span className="text-xs text-[#E6FFFA]">
                Compreendi os mecanismos moleculares de metilação e o papel reversível do epigenoma.
              </span>
            </label>
          </div>
        )}

        {activeTab === 'modulo2' && (
          <div className="space-y-6 bg-[#0B2228] p-6 rounded-2xl border border-[#123942]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>⚡</span> As 12 Alavancas Epigenéticas de Impacto Clínico
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#061316] rounded-xl border border-cyan-500/30 space-y-1">
                <h4 className="font-bold text-teal-300">Ritmo Circadiano & Luz Natural</h4>
                <p className="text-[11px] text-[#A5F3FC]">
                  A sincronização com a luz matinal regula a expressão dos genes de relógio e ativa o reparo mitocondrial noturno.
                </p>
              </div>
              <div className="p-4 bg-[#061316] rounded-xl border border-cyan-500/30 space-y-1">
                <h4 className="font-bold text-teal-300">Nutrientes Dadores de Metil</h4>
                <p className="text-[11px] text-[#A5F3FC]">
                  Metilfolato, Metilcobalamina e Betaina garantem o ciclo da homocisteína e a integridade da metilação global.
                </p>
              </div>
            </div>

            <label className="flex items-center gap-3 p-3 bg-[#061316] rounded-xl border border-[#123942] cursor-pointer">
              <input
                type="checkbox"
                checked={check2}
                onChange={(e) => setCheck2(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded"
              />
              <span className="text-xs text-[#E6FFFA]">
                Domino a aplicação prática das 12 alavancas epigenéticas no dia a dia do interagente.
              </span>
            </label>
          </div>
        )}

        {activeTab === 'modulo3' && (
          <div className="space-y-6 bg-[#0B2228] p-6 rounded-2xl border border-[#123942]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📋</span> Prescrição Clínica de Longevidade Celular
            </h2>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase">
                  Caderno de Notas Epigenéticas (Persistência Local)
                </h3>
                <button
                  type="button"
                  onClick={handleSalvarNotas}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 underline"
                >
                  Salvar Notas
                </button>
              </div>
              <textarea
                value={notasEstudo}
                onChange={(e) => setNotasEstudo(e.target.value)}
                placeholder="Registe as prioridades de intervenção nas alavancas epigenéticas e metas de longevidade..."
                rows={4}
                className="w-full bg-[#061316] border border-[#123942] rounded-xl p-3 text-xs text-white placeholder-[#155E75] focus:outline-none focus:border-cyan-400"
              />
            </div>

            <label className="flex items-center gap-3 p-3 bg-[#061316] rounded-xl border border-[#123942] cursor-pointer">
              <input
                type="checkbox"
                checked={check3}
                onChange={(e) => setCheck3(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded"
              />
              <span className="text-xs text-[#E6FFFA]">
                Concluí os estudos e estou capacitado para emitir prescrições epigenéticas de longevidade.
              </span>
            </label>

            <form onSubmit={handleGerarCertificado} className="p-4 bg-[#061316] rounded-xl border border-cyan-500/40 space-y-3">
              <h4 className="text-xs font-bold text-cyan-300 uppercase">
                Emissão de Certificado de Epigenética & Longevidade
              </h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Nome completo do terapeuta / médico"
                  value={alunoNome}
                  onChange={(e) => setAlunoNome(e.target.value)}
                  className="flex-1 bg-[#0B2228] border border-[#123942] rounded-xl px-4 py-2 text-xs text-white placeholder-[#155E75] focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-black text-xs font-extrabold hover:brightness-110 shadow-md transition-all shrink-0"
                >
                  Gerar Certificado
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'certificado' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#A5F3FC]">
                Certificado oficial registrado sob a titularidade Safe Creative internacional.
              </p>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-all shadow-md"
              >
                🖨️ Imprimir / Guardar em PDF
              </button>
            </div>

            <div className="bg-[#0B2228] p-8 sm:p-12 rounded-3xl border-2 border-cyan-500/50 text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="space-y-2">
                <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                  SISTEMA CANÓNICO IX · CYLINDER MARGIN
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  CERTIFICADO DE ESPECIALIZAÇÃO CLÍNICA
                </h2>
                <div className="text-xs text-cyan-200/80 font-mono">
                  Modulação da Expressão Gênica, Alavancas Epigenéticas & Longevidade Celular
                </div>
              </div>

              <div className="py-4 space-y-3 border-y border-[#123942]">
                <p className="text-xs text-[#A5F3FC] uppercase tracking-wider">Certificamos com distinção que</p>
                <p className="text-xl sm:text-2xl font-black text-teal-300 font-serif">
                  {alunoNome || 'Dr(a). Especialista em Epigenética'}
                </p>
                <p className="text-xs text-[#A5F3FC] max-w-xl mx-auto leading-relaxed">
                  concluiu com êxito o programa de modulação epigenética, aplicação das 12 alavancas de estilo de vida, protocolo de biofrequências de reparação telomérica (528Hz) e prescrição de longevidade do Sistema Canónico IX.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-[10px] text-[#0891B2] font-mono">
                <div>
                  <p className="text-[#A5F3FC] font-bold">Titular: Ricardo R Pereira</p>
                  <p>Cylinder Margin · cylindermargin.tech</p>
                </div>
                <div className="text-right">
                  <p className="text-cyan-400 font-bold">Safe Creative #2610157331452</p>
                  <p>Data: {new Date().toLocaleDateString('pt-PT')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
