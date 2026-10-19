/**
 * epi — epigenética em linguagem clara
 * Ideia: o DNA é o livro; a epigenética são as marcas a lápis.
 */

export type EpiCategory = 'conceito' | 'mecanismo' | 'efeito';
export type RelationKind = 'liga' | 'modula' | 'protege' | 'tensa';

export const EPI_ENTITIES = [
  {
    id: 'dna',
    name: 'DNA',
    short: 'Livro',
    category: 'conceito' as EpiCategory,
    plain: 'O texto fixo das tuas células — quase não muda.',
    roles: ['Guarda as instruções do corpo', 'É igual em quase todas as células'],
    signals: [],
    tip: 'Pensa no DNA como o livro impresso. A epigenética não rasura o livro — só marca páginas.',
    keys: ['dna', 'gene', 'heranc', 'genética'],
  },
  {
    id: 'epigenoma',
    name: 'Marcas epigenéticas',
    short: 'Lápis',
    category: 'conceito' as EpiCategory,
    plain: 'Sinais que dizem quais genes falam alto e quais ficam em silêncio.',
    roles: ['Mudam com o estilo de vida', 'Podem ser mais reversíveis que o DNA', 'Respondem a stress, sono e ambiente'],
    signals: ['Fadiga', 'Humor oscilante', 'Recuperação lenta'],
    tip: 'São "anotações" no livro — dá para melhorar o contexto em que o corpo lê.',
    keys: ['epi', 'marca', 'lifestyle', 'habito', 'hábito', 'ambiente'],
  },
  {
    id: 'metilacao',
    name: 'Metilação',
    short: 'Volume',
    category: 'mecanismo' as EpiCategory,
    plain: 'Um jeito comum de baixar ou regular o "volume" de um gene.',
    roles: ['Ajuda a silenciar o que não precisa estar sempre ligado', 'Depende de nutrientes (folato, B12, colina…)', 'Fica sensível ao stress crónico'],
    signals: ['Stress', 'Humor', 'Inflamação de baixo grau'],
    tip: 'Como um botão de volume — queremos equilíbrio, não máximo nem mudo permanente.',
    keys: ['metil', 'folato', 'b12', 'colina', 'stress', 'estresse', 'humor', 'inflam'],
  },
  {
    id: 'histonas',
    name: 'Histonas',
    short: 'Enrolar',
    category: 'mecanismo' as EpiCategory,
    plain: 'Proteínas em torno das quais o DNA se enrola — abrem ou fecham o acesso.',
    roles: ['Tornam genes mais fáceis ou mais difíceis de ler', 'Respondem a ritmo, exercício e recuperação'],
    signals: ['Sono irregular', 'Sedentarismo', 'Excesso de esforço sem descanso'],
    tip: 'Se o DNA está muito "apertado", o corpo lê menos; se está aberto demais, perde foco.',
    keys: ['histon', 'sono', 'movimento', 'exerc', 'recuper'],
  },
  {
    id: 'expressao',
    name: 'Expressão génica',
    short: 'Ligar / desligar',
    category: 'efeito' as EpiCategory,
    plain: 'Quais genes estão activos agora — e isso muda o dia a dia do corpo.',
    roles: ['Influi inflamação, humor e energia', 'Não exige mudar o DNA para mudar o rumo'],
    signals: ['Fadiga', 'Recuperação lenta', 'Inflamação'],
    tip: 'O mesmo livro, capítulos diferentes abertos conforme o contexto.',
    keys: ['express', 'gene', 'inflam', 'fadiga', 'energia', 'humor'],
  },
  {
    id: 'circadiano',
    name: 'Relógio circadiano',
    short: 'Ritmo',
    category: 'efeito' as EpiCategory,
    plain: 'O ritmo dia/noite que organiza sono, hormonas e reparação celular.',
    roles: ['Sincroniza reparação e metilação', 'Luz e horários de refeição importam'],
    signals: ['Insónia', 'Jet lag social', 'Fadiga matinal'],
    tip: 'Horários regulares são uma das alavancas epigenéticas mais baratas.',
    keys: ['sono', 'circadian', 'ritmo', 'luz', 'insonia', 'insónia', 'fadiga'],
  },
  {
    id: 'stress-eixo',
    name: 'Eixo do stress',
    short: 'Alerta',
    category: 'efeito' as EpiCategory,
    plain: 'Quando o alerta fica ligado tempo demais, as marcas do corpo acompanham.',
    roles: ['Cortisol e inflamação influenciam a expressão génica', 'Recuperação (sono, pausa, vínculo) ajuda a "desligar"'],
    signals: ['Ansiedade', 'Tensão', 'Burnout', 'Sono leve'],
    tip: 'Não é "fraqueza" — é biologia a pedir contexto mais seguro.',
    keys: ['stress', 'estresse', 'ansied', 'burnout', 'cortisol', 'tensao', 'tensão'],
  },
  {
    id: 'plasticidade',
    name: 'Plasticidade',
    short: 'Mudança',
    category: 'conceito' as EpiCategory,
    plain: 'Boa parte destas marcas pode melhorar com hábitos consistentes.',
    roles: ['Hábitos repetidos criam tendência', 'Pequenos passos acumulam', 'Não precisa de perfeição'],
    signals: ['Sensação de "preso" no padrão', 'Desânimo com mudanças'],
    tip: 'Tranquilo: consistência leve vence intensidades esporádicas.',
    keys: ['habito', 'hábito', 'mudanca', 'mudança', 'rotina', 'consist'],
  },
];

export const EPI_RELATIONS = [
  { from: 'metilacao', to: 'expressao', kind: 'modula' as RelationKind, note: 'O volume da metilação muda o que se expressa.' },
  { from: 'histonas', to: 'expressao', kind: 'modula' as RelationKind, note: 'Abrir/fechar o enrolamento muda o acesso aos genes.' },
  { from: 'circadiano', to: 'metilacao', kind: 'liga' as RelationKind, note: 'Ritmo irregular desorganiza a reparação e o volume génico.' },
  { from: 'stress-eixo', to: 'expressao', kind: 'tensa' as RelationKind, note: 'Alerta crónico enviesa inflamação e humor.' },
  { from: 'stress-eixo', to: 'circadiano', kind: 'tensa' as RelationKind, note: 'Stress alto e sono frágil andam juntos.' },
  { from: 'plasticidade', to: 'epigenoma', kind: 'protege' as RelationKind, note: 'Hábitos estáveis permitem remoldar marcas.' },
  { from: 'dna', to: 'epigenoma', kind: 'liga' as RelationKind, note: 'O livro (DNA) recebe as anotações (epigenoma).' },
];

export const EPI_QUEIXAS = [
  { id: 'stress', label: 'Stress / tensão', keys: ['stress', 'estresse', 'ansied', 'tensao', 'tensão', 'burnout'] },
  { id: 'sono', label: 'Sono irregular', keys: ['sono', 'circadian', 'insonia', 'insónia', 'ritmo', 'fadiga'] },
  { id: 'energia', label: 'Fadiga / energia', keys: ['fadiga', 'energia', 'recuper', 'express'] },
  { id: 'humor', label: 'Humor baixo', keys: ['humor', 'stress', 'metil', 'b12', 'folato'] },
  { id: 'inflamacao', label: 'Inflamação / recuperação', keys: ['inflam', 'recuper', 'express', 'movimento'] },
  { id: 'habitos', label: 'Quero mudar hábitos', keys: ['habito', 'hábito', 'plastic', 'rotina', 'consist', 'lifestyle'] },
  { id: 'vitalidade', label: 'Vitalidade / envelhecer bem', keys: ['vital', 'idade', 'sono', 'movimento', 'metil', 'circadian'] },
  { id: 'ambiente', label: 'Ambiente / toxinas', keys: ['ambiente', 'tox', 'lifestyle', 'epi', 'marca'] },
];

export const KIND_LABEL: Record<RelationKind, string> = {
  liga: 'liga-se a',
  modula: 'modula',
  protege: 'protege / favorece',
  tensa: 'tensiona',
};

export const CAT_LABEL: Record<EpiCategory, string> = {
  conceito: 'Ideia-chave',
  mecanismo: 'Como funciona',
  efeito: 'No dia a dia',
};

export function getEpi(id: string) {
  return EPI_ENTITIES.find((e) => e.id === id);
}

export function epiByKeys(keys: string[], limit = 3) {
  const scored = EPI_ENTITIES.map((e) => {
    const score = e.keys.reduce((acc, k) => (keys.some((q) => k.includes(q) || q.includes(k)) ? acc + 1 : acc), 0);
    return { e, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.e);
}

export function relationsByKeys(keys: string[], limit = 3) {
  return EPI_RELATIONS.filter((r) => {
    const a = getEpi(r.from);
    const b = getEpi(r.to);
    const blob = `${a?.keys.join(' ')} ${b?.keys.join(' ')} ${r.note}`.toLowerCase();
    return keys.some((k) => blob.includes(k));
  }).slice(0, limit);
}

export function relationsFor(id: string) {
  return EPI_RELATIONS.filter((r) => r.from === id || r.to === id);
}
