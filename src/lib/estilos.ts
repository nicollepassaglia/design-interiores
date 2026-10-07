// Os 4 estilos oficiais da Casa Possível. Para adicionar um novo estilo,
// acrescente um item aqui e uma alternativa em cada pergunta de perguntas.ts —
// nenhuma migração de banco é necessária, o catálogo de renders (RenderEstilo)
// é livre por string de estilo.
export const ESTILOS = [
  {
    id: "brasileira",
    nome: "Brasileira",
    descricao:
      "Caramelo, mostarda, terracota e verde-folha, com palhinha, cerâmica artesanal e plantas.",
  },
  {
    id: "natural",
    nome: "Natural",
    descricao:
      "Off-white quente, bege linho e verde sálvia, com madeira clara, juta e buclê.",
  },
  {
    id: "contemporaneo",
    nome: "Contemporâneo",
    descricao:
      "Off-white, greige e cinza com toque de preto, marcenaria limpa e luz em LED.",
  },
  {
    id: "industrial",
    nome: "Industrial",
    descricao:
      "Cinza cimento, preto e caramelo, com tijolinho, metal preto e madeira rústica.",
  },
] as const;

export type EstiloId = (typeof ESTILOS)[number]["id"];

export function nomeDoEstilo(id: string): string {
  return ESTILOS.find((e) => e.id === id)?.nome ?? id;
}
