import type { Estilo } from "./estilos";

export type Alternativa = {
  texto: string;
  estilo: Estilo;
};

export type Pergunta = {
  id: number;
  pontos: 1 | 2;
  texto: string;
  visual?: boolean;
  alternativas: Alternativa[];
};

export const PERGUNTAS: Pergunta[] = [
  {
    id: 1,
    pontos: 1,
    texto: "Qual paleta de cores te atrai mais?",
    alternativas: [
      { texto: "Terracota, terroso, verde-folha", estilo: "quente_organico" },
      { texto: "Amarelo, turquesa, rosa vibrante, estampas", estilo: "boho_tropical" },
      { texto: "Bege, cru, marrom claro, branco quente", estilo: "rustico_aconchegante" },
      { texto: "Neutro + uma cor de destaque forte (mostarda, vinho)", estilo: "contemporaneo_vibrante" },
    ],
  },
  {
    id: 2,
    pontos: 1,
    texto: "Qual frase mais combina com o clima que você quer em casa?",
    alternativas: [
      { texto: "“Quero me sentir em férias, num lugar quente”", estilo: "quente_organico" },
      { texto: "“Quero alegria e uma pitada de bagunça boa”", estilo: "boho_tropical" },
      { texto: "“Quero aconchego, tipo abraço”", estilo: "rustico_aconchegante" },
      { texto: "“Quero um lugar com cara de revista de decoração atual”", estilo: "contemporaneo_vibrante" },
    ],
  },
  {
    id: 3,
    pontos: 1,
    texto: "Qual material você escolheria sem pensar duas vezes?",
    alternativas: [
      { texto: "Palha, fibras naturais, muxarabi", estilo: "quente_organico" },
      { texto: "Rattan, vime, tecido estampado", estilo: "boho_tropical" },
      { texto: "Madeira crua, linho, lã", estilo: "rustico_aconchegante" },
      { texto: "Metal fosco, vidro, madeira escura", estilo: "contemporaneo_vibrante" },
    ],
  },
  {
    id: 4,
    pontos: 1,
    texto: "Como você imagina usar mais o espaço no dia a dia?",
    alternativas: [
      { texto: "Um cantinho para ler e desacelerar", estilo: "quente_organico" },
      { texto: "Receber amigos e criar memória", estilo: "boho_tropical" },
      { texto: "Descansar depois de um dia corrido, sem estímulo demais", estilo: "rustico_aconchegante" },
      { texto: "Viver num lugar com a cara de agora", estilo: "contemporaneo_vibrante" },
    ],
  },
  {
    id: 5,
    pontos: 1,
    texto: "Estampas e padronagens: até onde você vai?",
    alternativas: [
      { texto: "Discreta, mais textura do que estampa", estilo: "quente_organico" },
      { texto: "Quanto mais estampa, melhor", estilo: "boho_tropical" },
      { texto: "Prefiro liso, com textura no tecido", estilo: "rustico_aconchegante" },
      { texto: "Só uma estampa geométrica de impacto, o resto liso", estilo: "contemporaneo_vibrante" },
    ],
  },
  {
    id: 6,
    pontos: 1,
    texto: "Se o seu espaço fosse um lugar do mundo, qual seria?",
    alternativas: [
      { texto: "Uma casa de campo no México", estilo: "quente_organico" },
      { texto: "Uma praia colorida no Nordeste", estilo: "boho_tropical" },
      { texto: "Uma cabana no interior", estilo: "rustico_aconchegante" },
      { texto: "Um apartamento novo numa capital", estilo: "contemporaneo_vibrante" },
    ],
  },
  {
    id: 7,
    pontos: 2,
    texto: "Olhe as imagens abaixo e escolha a que mais te dá vontade de morar.",
    visual: true,
    alternativas: [
      { texto: "Quente Orgânico", estilo: "quente_organico" },
      { texto: "Boho Tropical", estilo: "boho_tropical" },
      { texto: "Rústico Aconchegante", estilo: "rustico_aconchegante" },
      { texto: "Contemporâneo Vibrante", estilo: "contemporaneo_vibrante" },
    ],
  },
];
