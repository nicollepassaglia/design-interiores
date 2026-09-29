import type { EstiloId } from "./estilos";

export type Alternativa = {
  texto: string;
  estilo: EstiloId;
};

export type Pergunta = {
  id: number;
  pontos: 1 | 2;
  texto: string;
  visual?: boolean;
  alternativas: Alternativa[];
};

// Perguntas de briefing de estilo — cada alternativa é redigida a partir das
// características descritas no Guia de Decoração ArqExpress para o estilo
// correspondente.
export const PERGUNTAS: Pergunta[] = [
  {
    id: 1,
    pontos: 1,
    texto: "Qual paleta e clima combinam mais com você?",
    alternativas: [
      { texto: "Neutros claros com toques de dourado — elegante e atemporal", estilo: "classico" },
      { texto: "Cinza, preto e marrom, com cor só nos detalhes de decoração", estilo: "industrial" },
      { texto: "Tons terrosos e naturais — aconchegante, remete ao campo", estilo: "rustico" },
      { texto: "Tons pastel suaves — delicado e sereno", estilo: "romantico" },
      { texto: "Neutros com uma mistura equilibrada de texturas atuais", estilo: "contemporaneo" },
    ],
  },
  {
    id: 2,
    pontos: 1,
    texto: "Qual combinação de materiais te atrai mais?",
    alternativas: [
      { texto: "Mármore, dourado e madeira entalhada", estilo: "classico" },
      { texto: "Tijolo aparente, cimento queimado e concreto", estilo: "industrial" },
      { texto: "Madeira de demolição, palha e vime", estilo: "rustico" },
      { texto: "Tecidos com estampas florais, rendas e tapetes macios", estilo: "romantico" },
      { texto: "Madeira, laca, vidro e ferro combinados no mesmo ambiente", estilo: "contemporaneo" },
    ],
  },
  {
    id: 3,
    pontos: 1,
    texto: "Qual frase representa o ambiente que você quer?",
    alternativas: [
      { texto: "Quero um ambiente sofisticado, com lustre de cristal e simetria", estilo: "classico" },
      { texto: "Quero estrutura aparente e um clima de loft urbano", estilo: "industrial" },
      { texto: "Quero trazer a natureza pra dentro de casa", estilo: "rustico" },
      { texto: "Quero um espaço que pareça um abraço, cheio de aconchego", estilo: "romantico" },
      { texto: "Quero um lugar com a cara de agora, simples e funcional", estilo: "contemporaneo" },
    ],
  },
  {
    id: 4,
    pontos: 1,
    texto: "O que não pode faltar no seu ambiente ideal?",
    alternativas: [
      { texto: "Um lustre de cristal", estilo: "classico" },
      { texto: "Tijolo ou concreto aparente", estilo: "industrial" },
      { texto: "Uma planta ou um móvel com madeira de demolição", estilo: "rustico" },
      { texto: "Uma estampa floral, renda ou arandela delicada", estilo: "romantico" },
      { texto: "Uma mistura de madeira, vidro e metal", estilo: "contemporaneo" },
    ],
  },
  {
    id: 5,
    pontos: 1,
    texto: "Como você imagina usar mais o espaço no dia a dia?",
    alternativas: [
      { texto: "Receber visitas com elegância, num ambiente refinado", estilo: "classico" },
      { texto: "Viver num espaço integrado, com personalidade forte e urbana", estilo: "industrial" },
      { texto: "Desacelerar rodeado de elementos naturais", estilo: "rustico" },
      { texto: "Relaxar num ambiente sereno e aconchegante", estilo: "romantico" },
      { texto: "Viver num espaço funcional, com a cara de agora", estilo: "contemporaneo" },
    ],
  },
  {
    id: 6,
    pontos: 1,
    texto: "Qual tipo de móvel mais te atrai?",
    alternativas: [
      { texto: "Móveis robustos e ornamentados, com puxadores trabalhados", estilo: "classico" },
      { texto: "Móveis funcionais em madeira maciça e metal", estilo: "industrial" },
      { texto: "Móveis antigos ou artesanais, com história", estilo: "rustico" },
      { texto: "Móveis com linhas curvas e arredondadas", estilo: "romantico" },
      { texto: "Móveis atuais que misturam diferentes materiais", estilo: "contemporaneo" },
    ],
  },
  {
    id: 7,
    pontos: 2,
    texto: "Olhe as imagens abaixo e escolha a que mais te dá vontade de morar.",
    visual: true,
    alternativas: [
      { texto: "Clássico", estilo: "classico" },
      { texto: "Industrial", estilo: "industrial" },
      { texto: "Rústico", estilo: "rustico" },
      { texto: "Romântico", estilo: "romantico" },
      { texto: "Contemporâneo", estilo: "contemporaneo" },
    ],
  },
];
