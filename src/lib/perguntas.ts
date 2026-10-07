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

// Cada alternativa pontua um estilo. A pergunta 7 (visual) vale 2 pontos e
// desempata. Cores, materiais e iluminação vêm da tabela de estilos do
// documento de contexto da Casa Possível.
export const PERGUNTAS: Pergunta[] = [
  {
    id: 1,
    pontos: 1,
    texto: "Qual paleta e clima combinam mais com você?",
    alternativas: [
      { texto: "Caramelo, mostarda, terracota e verde-folha — quente e cheio de vida", estilo: "brasileira" },
      { texto: "Off-white quente, bege linho e verde sálvia — calmo e acolhedor", estilo: "natural" },
      { texto: "Off-white, greige e cinza, com um toque de preto — limpo e atual", estilo: "contemporaneo" },
      { texto: "Cinza cimento, preto e caramelo — urbano e com personalidade", estilo: "industrial" },
    ],
  },
  {
    id: 2,
    pontos: 1,
    texto: "Qual combinação de materiais te atrai mais?",
    alternativas: [
      { texto: "Madeira freijó, palhinha, couro caramelo e cerâmica artesanal", estilo: "brasileira" },
      { texto: "Madeira clara, linho, juta e buclê", estilo: "natural" },
      { texto: "Superfícies lisas, marcenaria sem puxador, metal preto e vidro", estilo: "contemporaneo" },
      { texto: "Efeito cimento, tijolinho aparente, metal preto e madeira rústica", estilo: "industrial" },
    ],
  },
  {
    id: 3,
    pontos: 1,
    texto: "Qual frase representa o ambiente que você quer?",
    alternativas: [
      { texto: "Quero uma casa com cor, calor e a cara do Brasil", estilo: "brasileira" },
      { texto: "Quero um refúgio calmo, que abrace quando eu chego", estilo: "natural" },
      { texto: "Quero um espaço limpo, organizado e com cara de agora", estilo: "contemporaneo" },
      { texto: "Quero um clima de loft, com estrutura e personalidade forte", estilo: "industrial" },
    ],
  },
  {
    id: 4,
    pontos: 1,
    texto: "Qual iluminação você imagina para o seu espaço?",
    alternativas: [
      { texto: "Pendentes de palha ou fibra natural", estilo: "brasileira" },
      { texto: "Luz indireta e quente, com luminárias de fibra ou papel de arroz", estilo: "natural" },
      { texto: "Fitas de LED embutidas e spots discretos", estilo: "contemporaneo" },
      { texto: "Trilho com spots pretos e lâmpadas de filamento", estilo: "industrial" },
    ],
  },
  {
    id: 5,
    pontos: 1,
    texto: "Como você imagina usar mais o espaço no dia a dia?",
    alternativas: [
      { texto: "Receber amigos e família, com mesa cheia e clima de festa", estilo: "brasileira" },
      { texto: "Desacelerar e descansar, sem estímulo demais", estilo: "natural" },
      { texto: "Viver num espaço funcional, com tudo no lugar", estilo: "contemporaneo" },
      { texto: "Viver num espaço integrado e aberto, com personalidade urbana", estilo: "industrial" },
    ],
  },
  {
    id: 6,
    pontos: 1,
    texto: "Qual detalhe não pode faltar?",
    alternativas: [
      { texto: "Plantas tropicais e cerâmica feita à mão", estilo: "brasileira" },
      { texto: "Uma manta de linho e um tapete de juta", estilo: "natural" },
      { texto: "Marcenaria limpa, de linhas retas", estilo: "contemporaneo" },
      { texto: "Uma parede de tijolinho ou efeito cimento", estilo: "industrial" },
    ],
  },
  {
    id: 7,
    pontos: 2,
    texto: "Olhe as imagens abaixo e escolha a que mais te dá vontade de morar.",
    visual: true,
    alternativas: [
      { texto: "Brasileira", estilo: "brasileira" },
      { texto: "Natural", estilo: "natural" },
      { texto: "Contemporâneo", estilo: "contemporaneo" },
      { texto: "Industrial", estilo: "industrial" },
    ],
  },
];
