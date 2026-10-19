/**
 * Alavancas de estilo de vida — o que o dia a dia pode modular no epigenoma.
 * Linguagem prática; sem catálogo alimentar como eixo.
 */

import type { RelationKind } from './epiSystem';

export type LeverCategory = 'ritmo' | 'corpo' | 'mente' | 'nutriente' | 'ambiente';

export const LEVERS = [
  {
    id: 'sono',
    name: 'Sono e horário',
    short: 'Sono',
    category: 'ritmo' as LeverCategory,
    plain: 'Dormir e acordar em horários parecidos — a reparação celular gosta de ritmo.',
    does: ['Apoia o relógio circadiano', 'Dá espaço à metilação e recuperação', 'Suaviza o eixo do stress'],
    tip: 'Mesmo 20–30 min mais regulares já ajudam. Luz de manhã > ecrãs à noite.',
    epiIds: ['circadiano', 'metilacao', 'stress-eixo'],
    keys: ['sono', 'circadian', 'ritmo', 'insonia', 'insónia', 'fadiga'],
  },
  {
    id: 'stress',
    name: 'Pausas no stress',
    short: 'Pausa',
    category: 'mente' as LeverCategory,
    plain: 'Sinais de segurança para o corpo: respiração, caminhada curta, contacto social.',
    does: ['Baixa o "alerta contínuo"', 'Ajuda a expressão génica mais calma', 'Protege humor e inflamação'],
    tip: 'Não precisa de meditação perfeita — 5 minutos consistentes já contam.',
    epiIds: ['stress-eixo', 'expressao', 'plasticidade'],
    keys: ['stress', 'estresse', 'ansied', 'burnout', 'tensao', 'tensão', 'humor'],
  },
  {
    id: 'movimento',
    name: 'Movimento',
    short: 'Mover',
    category: 'corpo' as LeverCategory,
    plain: 'Actividade regular (nem precisa de ginásio extremo) muda o que os genes "mostram".',
    does: ['Abre plasticidade', 'Ajuda inflamação e humor', 'Complementa sono e ritmo'],
    tip: 'Caminhada diária > sessões heróicas uma vez por mês.',
    epiIds: ['histonas', 'expressao', 'plasticidade'],
    keys: ['movimento', 'exerc', 'inflam', 'humor', 'energia', 'vital'],
  },
  {
    id: 'folato-b',
    name: 'Nutrientes da metilação',
    short: 'Folato · B',
    category: 'nutriente' as LeverCategory,
    plain: 'O corpo usa folato, B12, B6 e colina para "afinar o volume" dos genes.',
    does: ['Suporta vias de metilação', 'Liga nutrição à expressão génica', 'Importa em humor e recuperação'],
    tip: 'Pensa em padrão alimentar estável — não em milagre de uma pílula isolada.',
    epiIds: ['metilacao', 'expressao'],
    keys: ['metil', 'folato', 'b12', 'colina', 'humor', 'inflam'],
  },
  {
    id: 'luz',
    name: 'Luz e ecrãs',
    short: 'Luz',
    category: 'ritmo' as LeverCategory,
    plain: 'Luz natural de dia e menos azul intenso à noite alinham o relógio interno.',
    does: ['Sincroniza circadiano', 'Melhora qualidade do sono', 'Indirectamente favorece metilação'],
    tip: '10 minutos de luz matinal ao ar livre são uma alavanca barata e forte.',
    epiIds: ['circadiano', 'sono'],
    keys: ['luz', 'sono', 'circadian', 'ritmo', 'ecra', 'ecrã'],
  },
  {
    id: 'ambiente',
    name: 'Ambiente e exposição',
    short: 'Ambiente',
    category: 'ambiente' as LeverCategory,
    plain: 'Fumo, poluição, químicos e ruído contínuo também deixam marcas no corpo.',
    does: ['Reduz carga tóxica que tensiona o epigenoma', 'Apoia recuperação se o ambiente melhora'],
    tip: 'Começa pelo óbvio: ar, fumo, produtos de limpeza agressivos — sem paranoia.',
    epiIds: ['epigenoma', 'expressao', 'stress-eixo'],
    keys: ['ambiente', 'tox', 'fumo', 'polu', 'lifestyle', 'marca'],
  },
  {
    id: 'vinculo',
    name: 'Vínculo e segurança',
    short: 'Vínculo',
    category: 'mente' as LeverCategory,
    plain: 'Relações estáveis e sensação de pertença regulam o eixo do stress.',
    does: ['Sinais de segurança biológica', 'Apoia humor e plasticidade', 'Complementa sono e pausas'],
    tip: 'Uma conversa real ou comunidade leve também é fisiologia.',
    epiIds: ['stress-eixo', 'plasticidade', 'expressao'],
    keys: ['vinculo', 'vínculo', 'social', 'humor', 'stress', 'segur'],
  },
  {
    id: 'consistencia',
    name: 'Consistência leve',
    short: 'Hábito',
    category: 'corpo' as LeverCategory,
    plain: 'Repetir pouco, com calma, molda marcas melhor do que mudanças bruscas.',
    does: ['Activa plasticidade', 'Evita o ciclo "tudo ou nada"', 'Sustenta as outras alavancas'],
    tip: 'Escolhe 1–2 hábitos e mantém 3 semanas antes de acrescentar mais.',
    epiIds: ['plasticidade', 'epigenoma'],
    keys: ['habito', 'hábito', 'consist', 'rotina', 'mudanca', 'mudança', 'plastic'],
  },
];

export const EPI_LEVER_BRIDGES: {
  leverId: string;
  epiId: string;
  kind: RelationKind;
  note: string;
}[] = [
  { leverId: 'sono', epiId: 'circadiano', kind: 'liga', note: 'Sono estável sincroniza o ritmo.' },
  { leverId: 'sono', epiId: 'metilacao', kind: 'protege', note: 'Reparação nocturna apoia metilação equilibrada.' },
  { leverId: 'stress', epiId: 'stress-eixo', kind: 'modula', note: 'Pausas baixam o alerta crónico.' },
  { leverId: 'movimento', epiId: 'expressao', kind: 'modula', note: 'Mover-se muda o que os genes expressam.' },
  { leverId: 'folato-b', epiId: 'metilacao', kind: 'liga', note: 'Cofatores alimentam a via do "volume".' },
  { leverId: 'luz', epiId: 'circadiano', kind: 'liga', note: 'Luz de manhã ancora o relógio.' },
  { leverId: 'ambiente', epiId: 'epigenoma', kind: 'tensa', note: 'Exposições crónicas tensionam as marcas.' },
  { leverId: 'vinculo', epiId: 'stress-eixo', kind: 'protege', note: 'Segurança social protege o eixo do stress.' },
  { leverId: 'consistencia', epiId: 'plasticidade', kind: 'protege', note: 'Repetição leve permite mudança estável.' },
];

export const LEVER_CAT_LABEL: Record<LeverCategory, string> = {
  ritmo: 'Ritmo',
  corpo: 'Corpo',
  mente: 'Mente',
  nutriente: 'Nutriente-chave',
  ambiente: 'Ambiente',
};

export function getLever(id: string) {
  return LEVERS.find((l) => l.id === id);
}

export function leversByKeys(keys: string[], limit = 3) {
  const scored = LEVERS.map((l) => {
    const score = l.keys.reduce((acc, k) => (keys.some((q) => k.includes(q) || q.includes(k)) ? acc + 1 : acc), 0);
    return { l, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.l);
}

export function bridgesByKeys(keys: string[], limit = 3) {
  return EPI_LEVER_BRIDGES.filter((b) => {
    const lever = getLever(b.leverId);
    const blob = `${lever?.keys.join(' ')} ${b.note}`.toLowerCase();
    return keys.some((k) => blob.includes(k));
  }).slice(0, limit);
}
