'use client';

import React, { useState, useMemo } from 'react';
import EpigeneticaHeader from '@/app/components/EpigeneticaHeader';
import EpigeneticaFrequencyPlayer from '@/app/components/EpigeneticaFrequencyPlayer';
import {
  EPI_ENTITIES,
  EPI_RELATIONS,
  EPI_QUEIXAS,
  CAT_LABEL,
  KIND_LABEL,
  getEpi,
  relationsFor,
  type EpiCategory,
} from '@/lib/epigenetica/epiSystem';
import {
  LEVERS,
  LEVER_CAT_LABEL,
  EPI_LEVER_BRIDGES,
  type LeverCategory,
} from '@/lib/epigenetica/levers';

export default function EpigeneticaPage() {
  const [activeTab, setActiveTab] = useState<'alavancas' | 'pecas' | 'mapa' | 'plano'>('alavancas');

  // Aba Alavancas: busca e filtros
  const [searchLever, setSearchLever] = useState('');
  const [selectedLeverCat, setSelectedLeverCat] = useState<'all' | LeverCategory>('all');
  const [activeLeverId, setActiveLeverId] = useState<string>(LEVERS[0].id);

  // Aba Peças: filtro de categoria e seleção
  const [selectedEntityId, setSelectedEntityId] = useState<string>(EPI_ENTITIES[0].id);
  const [selectedEntityCat, setSelectedEntityCat] = useState<'all' | EpiCategory>('all');

  // Aba Plano Epigenético Personalizado
  const [patientName, setPatientName] = useState('');
  const [therapistName, setTherapistName] = useState('Dr(a). Terapeuta Integrativo');
  const [selectedQueixas, setSelectedQueixas] = useState<string[]>(['sono', 'stress']);
  const [sleepTime, setSleepTime] = useState<'regular' | 'irregular'>('irregular');
  const [morningSun, setMorningSun] = useState<'sim' | 'nao'>('nao');
  const [fastingWindow, setFastingWindow] = useState<'12h' | '14h' | 'nenhuma'>('nenhuma');
  const [stressPausas, setStressPausas] = useState<'raro' | 'regular'>('raro');
  const [notes, setNotes] = useState('Priorizar a calibração do ciclo circadiano e os doadores biológicos de metilação nas primeiras 3 semanas.');
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  // Filtro de Alavancas
  const filteredLevers = useMemo(() => {
    const q = searchLever.toLowerCase().trim();
    return LEVERS.filter((l) => {
      const matchCat = selectedLeverCat === 'all' || l.category === selectedLeverCat;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.plain.toLowerCase().includes(q) ||
        l.tip.toLowerCase().includes(q) ||
        l.does.some((d) => d.toLowerCase().includes(q))
      );
    });
  }, [searchLever, selectedLeverCat]);

  // Alavanca ativa detalhada
  const activeLever = useMemo(() => {
    return LEVERS.find((l) => l.id === activeLeverId) || LEVERS[0];
  }, [activeLeverId]);

  const activeLeverBridges = useMemo(() => {
    return EPI_LEVER_BRIDGES.filter((b) => b.leverId === activeLever.id);
  }, [activeLever]);

  // Filtro de Peças do Epigenoma
  const filteredEntities = useMemo(() => {
    return EPI_ENTITIES.filter((e) => {
      if (selectedEntityCat === 'all') return true;
      return e.category === selectedEntityCat;
    });
  }, [selectedEntityCat]);

  // Entidade ativa detalhada
  const activeEntity = useMemo(() => {
    return EPI_ENTITIES.find((e) => e.id === selectedEntityId) || EPI_ENTITIES[0];
  }, [selectedEntityId]);

  const activeEntityRelations = useMemo(() => {
    return relationsFor(activeEntity.id);
  }, [activeEntity]);

  // Toggle de queixa no plano
  const toggleQueixa = (id: string) => {
    setSelectedQueixas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Alavancas recomendadas pelo plano
  const recommendedLevers = useMemo(() => {
    const matched = new Set<string>();
    selectedQueixas.forEach((qid) => {
      const q = EPI_QUEIXAS.find((item) => item.id === qid);
      if (q) {
        LEVERS.forEach((lever) => {
          if (lever.keys.some((k) => q.keys.includes(k))) {
            matched.add(lever.id);
          }
        });
      }
    });
    // Garante que alavancas básicas essenciais estejam presentes se marcadas
    if (sleepTime === 'irregular') matched.add('sono');
    if (morningSun === 'nao') matched.add('luz');
    if (stressPausas === 'raro') matched.add('stress');
    return LEVERS.filter((l) => matched.has(l.id));
  }, [selectedQueixas, sleepTime, morningSun, stressPausas]);

  // Copiar relatório do plano
  const handleCopyPlan = () => {
    const text = `PLANO CLÍNICO DE MODULAÇÃO EPIGENÉTICA
Paciente: ${patientName || 'Interagente'}
Terapeuta Responsável: ${therapistName}
Data: ${new Date().toLocaleDateString('pt-BR')}

QUEIXAS E DESAFIOS CLÍNICOS MAPEADOS:
${selectedQueixas.map((q) => `• ${EPI_QUEIXAS.find((x) => x.id === q)?.label}`).join('\n')}

DIRETRIZES DE ESTILO DE VIDA EPIGENÉTICO:
- Sono Circadiano: ${sleepTime === 'regular' ? 'Regular (manter)' : 'Ajustar para antes das 23h, escuridão total'}
- Fotobiomodulação Matinal: ${morningSun === 'sim' ? 'Praticando' : '15 min de luz solar direta nos olhos/pele antes das 10h'}
- Descanso Digestivo (Autofagia): ${fastingWindow}
- Pausas Vagas no Stress: ${stressPausas === 'regular' ? 'Presente' : '3 momentos diários de 5 minutos de respiração nasal lenta'}

ALAVANCAS EPIGENÉTICAS PRIORITÁRIAS:
${recommendedLevers.map((l) => `- ${l.name} (${l.short}): ${l.plain}\n  Ação: ${l.tip}`).join('\n\n')}

NUTRIENTES PARA SUPORTE À METILAÇÃO CELULAR:
- Doadores de metil: Folato bioativo (vegetais verde-escuros), Vitamina B12, Colina (gema de ovo caipira), Betaína e Zinco quelatado.

OBSERVAÇÕES CLÍNICAS:
${notes}

CERTIFICAÇÃO DO SISTEMA:
Safe Creative ID #2610157331452 · Tecnologia Cylinder Margin · Ricardo R Pereira`;

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedFeedback(true);
      setTimeout(() => setCopiedFeedback(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-[#E2E8F0] font-sans selection:bg-[#6366F1]/20 selection:text-[#6366F1]">
      {/* Header Unificado */}
      <EpigeneticaHeader>
        <button
          onClick={() => setActiveTab('plano')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeTab === 'plano'
              ? 'bg-[#6366F1] text-white shadow-md shadow-[#6366F1]/30 font-bold'
              : 'bg-[#1E293B] text-[#94A3B8] border border-[#334155] hover:text-white'
          }`}
        >
          <span>🧬 Gerar Plano Epigenético</span>
        </button>
      </EpigeneticaHeader>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-10">
        {/* Hero Section */}
        <section className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.45em] text-[#6366F1] font-bold font-mono">
            PORTAL III · EPIGENETICSYSTEMS · SOBERANIA E AUTO-REGENERAÇÃO CELULAR
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-white">
            O DNA é o Livro, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300">Você é o Autor</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            A genética não é uma sentença biológica. Através do ambiente, ritmos circadianos, luz solar, silêncio e nutrição celular, você escreve as marcas epigenéticas que expressam a regeneração e silenciam a inflamação.
          </p>
        </section>

        {/* Barra de Navegação das 4 Abas */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-indigo-500/20 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('alavancas')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'alavancas'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-[#0E1526] text-slate-400 hover:text-white hover:bg-[#16213B] border border-[#123942]'
            }`}
          >
            ⚡ As 8 Alavancas Práticas
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pecas')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'pecas'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-[#0E1526] text-slate-400 hover:text-white hover:bg-[#16213B] border border-[#123942]'
            }`}
          >
            🧩 Peças do Epigenoma ({EPI_ENTITIES.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mapa')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'mapa'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-[#0E1526] text-slate-400 hover:text-white hover:bg-[#16213B] border border-[#123942]'
            }`}
          >
            🕸️ Mapa de Relações
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('plano')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'plano'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-[#0E1526] text-slate-400 hover:text-white hover:bg-[#16213B] border border-[#123942]'
            }`}
          >
            📋 Gerador de Plano Clínico
          </button>
        </div>

        {/* =========================================================================
            ABA 1: AS 8 ALAVANCAS DO ESTILO DE VIDA
        ========================================================================= */}
        {activeTab === 'alavancas' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Controles de Filtro e Busca */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0E1526]/80 p-4 rounded-2xl border border-indigo-500/20 backdrop-blur-md">
              <div className="flex flex-wrap gap-1.5">
                {(['all', 'ritmo', 'corpo', 'mente', 'nutriente', 'ambiente'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedLeverCat(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedLeverCat === c
                        ? 'bg-indigo-600 text-white font-bold shadow'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {c === 'all' ? 'Todas' : LEVER_CAT_LABEL[c]}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  value={searchLever}
                  onChange={(e) => setSearchLever(e.target.value)}
                  placeholder="Buscar alavanca, sono, luz..."
                  className="w-full bg-[#070B14] border border-indigo-500/30 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                />
              </div>
            </div>

            {/* Painel da Alavanca em Destaque */}
            <div className="rounded-3xl border border-indigo-500/30 bg-[#0C1222] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-15 blur-3xl"
                style={{ background: '#6366F1' }}
              />

              <div className="space-y-5 relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    CATEGORIA: {LEVER_CAT_LABEL[activeLever.category]}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Alavanca ID: #{activeLever.id}
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {activeLever.name}
                  </h2>
                  <p className="text-sm text-slate-300 mt-2 font-light leading-relaxed">
                    {activeLever.plain}
                  </p>
                </div>

                {/* Ação Prática / Dica */}
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/25 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 block">
                    ✦ Dica de Prática Diária:
                  </span>
                  <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-medium">
                    {activeLever.tip}
                  </p>
                </div>

                {/* Papéis Biológicos que esta Alavanca Cumpre */}
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    O Que Esta Alavanca Modula no Seu Corpo:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {activeLever.does.map((d, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-[#080D1A] border border-[#123942] text-xs text-slate-300 flex items-start gap-2"
                      >
                        <span className="text-indigo-400 font-bold">✓</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conexões com Peças do Epigenoma */}
                {activeLeverBridges.length > 0 && (
                  <div className="pt-4 border-t border-[#123942] flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">Conecta-se com:</span>
                    {activeLeverBridges.map((b, i) => {
                      const entity = getEpi(b.epiId);
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setSelectedEntityId(b.epiId);
                            setActiveTab('pecas');
                          }}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:bg-purple-900/60 transition"
                        >
                          {entity?.name || b.epiId} ({b.kind})
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Grid das 8 Alavancas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredLevers.map((lever) => {
                const isSelected = lever.id === activeLever.id;
                return (
                  <div
                    key={lever.id}
                    onClick={() => setActiveLeverId(lever.id)}
                    className={`cursor-pointer rounded-2xl border p-5 transition-all duration-200 flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'border-indigo-400 bg-indigo-950/40 shadow-xl shadow-indigo-500/10'
                        : 'border-[#123942] bg-[#0B2228] hover:border-slate-700 hover:bg-[#0E1528]'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
                          {LEVER_CAT_LABEL[lever.category]}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {lever.short}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-white tracking-tight">
                        {lever.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {lever.plain}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#123942]/80 flex items-center justify-between text-[11px] text-indigo-300 font-medium">
                      <span>Ver detalhes</span>
                      <span>→</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            ABA 2: PEÇAS DO EPIGENOMA (CONCEITOS & MECANISMOS)
        ========================================================================= */}
        {activeTab === 'pecas' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Filtros de Peças */}
            <div className="flex items-center gap-2 border-b border-indigo-500/20 pb-4">
              {(['all', 'conceito', 'mecanismo', 'efeito'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedEntityCat(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    selectedEntityCat === cat
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'Todas as Peças' : CAT_LABEL[cat]}
                </button>
              ))}
            </div>

            {/* Painel da Peça em Destaque */}
            <div className="rounded-3xl border border-purple-500/30 bg-[#100D20] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    {CAT_LABEL[activeEntity.category]} · {activeEntity.short}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    ID: #{activeEntity.id}
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {activeEntity.name}
                  </h2>
                  <p className="text-base text-slate-200 mt-2 font-light leading-relaxed">
                    {activeEntity.plain}
                  </p>
                </div>

                {/* Analogia / Dica */}
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/25">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 block mb-1">
                    ✦ Entendimento Intuitivo:
                  </span>
                  <p className="text-xs sm:text-sm text-purple-100 font-medium leading-relaxed">
                    {activeEntity.tip}
                  </p>
                </div>

                {/* Papéis Fundamentais */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#090714] border border-[#123942] space-y-2">
                    <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold block">
                      Como Funciona no Organismo:
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                      {activeEntity.roles.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  {activeEntity.signals.length > 0 && (
                    <div className="p-4 rounded-xl bg-[#090714] border border-[#123942] space-y-2">
                      <span className="text-xs uppercase tracking-wider text-rose-400 font-bold block">
                        Sinais de Desregulação no Dia a Dia:
                      </span>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                        {activeEntity.signals.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Relações Desta Peça com Outras Peças */}
                {activeEntityRelations.length > 0 && (
                  <div className="pt-4 border-t border-[#123942] space-y-2">
                    <span className="text-xs text-slate-400 font-mono block">
                      Relações no Epigenoma:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeEntityRelations.map((rel, i) => {
                        const targetId = rel.from === activeEntity.id ? rel.to : rel.from;
                        const target = getEpi(targetId);
                        return (
                          <div
                            key={i}
                            className="px-3 py-1.5 rounded-xl bg-black/40 border border-[#123942] text-xs text-slate-300 flex items-center gap-1.5"
                          >
                            <span className="font-bold text-white">{activeEntity.name}</span>
                            <span className="text-indigo-400 font-mono text-[10px]">
                              [{KIND_LABEL[rel.kind]}]
                            </span>
                            <span className="text-purple-300 font-bold">{target?.name}</span>
                            <span className="text-slate-500 text-[10px] hidden md:inline">• {rel.note}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Grid de Todas as Peças */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredEntities.map((ent) => {
                const isSelected = ent.id === activeEntity.id;
                return (
                  <div
                    key={ent.id}
                    onClick={() => setSelectedEntityId(ent.id)}
                    className={`cursor-pointer rounded-2xl border p-5 transition-all duration-200 space-y-3 ${
                      isSelected
                        ? 'border-purple-400 bg-purple-950/40 shadow-xl shadow-purple-500/10'
                        : 'border-[#123942] bg-[#0C0A18] hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                        {CAT_LABEL[ent.category]}
                      </span>
                      <span className="text-xs text-slate-500 font-mono font-bold">
                        {ent.short}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-white">{ent.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {ent.plain}
                    </p>

                    <div className="pt-2 border-t border-[#123942]/80 text-[11px] text-purple-300 font-medium flex items-center justify-between">
                      <span>Explorar peça</span>
                      <span>→</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            ABA 3: MAPA DE RELAÇÕES EPIGENÉTICAS
        ========================================================================= */}
        {activeTab === 'mapa' && (
          <div className="space-y-6 animate-fadeIn">
            <EpigeneticaFrequencyPlayer />
            <div className="rounded-3xl border border-indigo-500/25 bg-[#0B2228] p-6 sm:p-8 backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-bold text-white mb-2">
                A Teia de Interações do Epigenoma
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
                Nenhum gene opera de forma isolada. Veja como os mecanismos moleculares, os ritmos biológicos e as tensões diárias interagem de forma causal:
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {EPI_RELATIONS.map((rel, i) => {
                  const fromEnt = getEpi(rel.from);
                  const toEnt = getEpi(rel.to);
                  const kindColor =
                    rel.kind === 'modula'
                      ? 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20'
                      : rel.kind === 'protege'
                      ? 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20'
                      : rel.kind === 'tensa'
                      ? 'text-rose-400 border-rose-500/30 bg-rose-950/20'
                      : 'text-indigo-400 border-indigo-500/30 bg-indigo-950/20';

                  return (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-[#0E1528] border border-[#123942] space-y-2 hover:border-indigo-500/40 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-white text-base">
                          {fromEnt?.name}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${kindColor}`}>
                          {KIND_LABEL[rel.kind]}
                        </span>
                        <span className="font-serif font-bold text-purple-300 text-base">
                          {toEnt?.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-light leading-relaxed pt-1 border-t border-[#123942]">
                        {rel.note}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            ABA 4: GERADOR DE PLANO CLÍNICO DE MODULAÇÃO EPIGENÉTICA
        ========================================================================= */}
        {activeTab === 'plano' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="rounded-3xl border border-indigo-500/30 bg-[#0C1222] p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">
                  SISTEMA DE PRESCRIÇÃO CLÍNICA PERSONALIZADA
                </span>
                <h2 className="font-serif text-3xl font-bold text-white tracking-tight mt-1">
                  Gerador do Plano Epigenético Individual
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-1 max-w-2xl">
                  Selecione os desafios clínicos e os hábitos atuais do interagente para calibrar automaticamente as alavancas de regeneração celular.
                </p>
              </div>

              {/* Identificação do Terapeuta e Interagente */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#123942]">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Nome do Interagente / Paciente:
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Ex: Maria Silva"
                    className="w-full bg-[#070B14] border border-[#123942] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Terapeuta Responsável:
                  </label>
                  <input
                    type="text"
                    value={therapistName}
                    onChange={(e) => setTherapistName(e.target.value)}
                    className="w-full bg-[#070B14] border border-[#123942] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              {/* Seleção de Queixas Clínicas */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Desafios Clínicos & Queixas do Interagente (Selecione todos os aplicáveis):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {EPI_QUEIXAS.map((q) => {
                    const active = selectedQueixas.includes(q.id);
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => toggleQueixa(q.id)}
                        className={`p-3 rounded-xl border text-xs text-left transition ${
                          active
                            ? 'bg-indigo-600/30 border-indigo-400 text-white font-bold shadow'
                            : 'bg-[#080D1A] border-[#123942] text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {active ? '✓ ' : '+ '}
                        {q.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Parâmetros de Rotina do Interagente */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#080D1A] border border-[#123942]">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">
                    Sono & Horários:
                  </label>
                  <select
                    value={sleepTime}
                    onChange={(e) => setSleepTime(e.target.value as any)}
                    className="w-full bg-[#0E1528] border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none"
                  >
                    <option value="irregular">Irregular / Dorme após 23h</option>
                    <option value="regular">Regular / Dorme antes das 23h</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">
                    Luz Solar Matinal:
                  </label>
                  <select
                    value={morningSun}
                    onChange={(e) => setMorningSun(e.target.value as any)}
                    className="w-full bg-[#0E1528] border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none"
                  >
                    <option value="nao">Não expõe olhos/pele ao sol cedo</option>
                    <option value="sim">15 min de sol matinal regular</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">
                    Janela Digestiva (Autofagia):
                  </label>
                  <select
                    value={fastingWindow}
                    onChange={(e) => setFastingWindow(e.target.value as any)}
                    className="w-full bg-[#0E1528] border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none"
                  >
                    <option value="nenhuma">Sem janela / come tarde à noite</option>
                    <option value="12h">12 horas (noturna padrão)</option>
                    <option value="14h">14 horas (autofagia ativa)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">
                    Pausas no Stress (Vago):
                  </label>
                  <select
                    value={stressPausas}
                    onChange={(e) => setStressPausas(e.target.value as any)}
                    className="w-full bg-[#0E1528] border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none"
                  >
                    <option value="raro">Raro / Alerta contínuo</option>
                    <option value="regular">3 pausas de 5 min diárias</option>
                  </select>
                </div>
              </div>

              {/* Alavancas Recomendadas em Tempo Real */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-indigo-300 font-bold block">
                  ✦ Alavancas Epigenéticas Prioritárias Calculadas ({recommendedLevers.length}):
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {recommendedLevers.map((lever) => (
                    <div
                      key={lever.id}
                      className="p-3.5 rounded-xl bg-[#0E1528] border border-indigo-500/30 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-white text-xs font-serif font-bold">
                          {lever.name} ({lever.short})
                        </strong>
                        <span className="text-[10px] font-mono text-indigo-400">
                          {LEVER_CAT_LABEL[lever.category]}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-light">{lever.plain}</p>
                      <p className="text-[10px] text-indigo-200 font-mono pt-1">
                        👉 {lever.tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notas do Terapeuta */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Orientações Clínicas e Metilação Complementar:
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#070B14] border border-[#123942] rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-400"
                />
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#123942]">
                <span className="text-[11px] text-slate-400 font-mono">
                  Registo Safe Creative ID #2610157331452 · Tecnologia Cylinder Margin
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyPlan}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-500/25 hover:opacity-95 transition"
                  >
                    {copiedFeedback ? '✓ Plano Copiado para o Clipboard!' : '📄 Copiar Relatório Clínico'}
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2.5 rounded-xl bg-[#1E293B] border border-[#334155] text-slate-200 text-xs font-semibold hover:text-white hover:bg-[#334155] transition"
                  >
                    🖨️ Imprimir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
