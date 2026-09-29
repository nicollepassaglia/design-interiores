// Estilos baseados no Guia de Decoração ArqExpress. Para adicionar um novo
// estilo (ex: Retrô, Minimalista, Moderno), basta acrescentar um item aqui —
// nenhuma migração de banco é necessária, o catálogo de renders (RenderEstilo)
// é livre por string de estilo.
export const ESTILOS = [
  {
    id: "classico",
    nome: "Clássico",
    descricao:
      "Linhas elegantes e sofisticadas, móveis robustos, mármore e dourado, lustres de cristal.",
  },
  {
    id: "industrial",
    nome: "Industrial",
    descricao:
      "Estrutura aparente, tijolo, cimento queimado e concreto — clima de loft urbano.",
  },
  {
    id: "rustico",
    nome: "Rústico",
    descricao:
      "Madeira de demolição, artesanal, plantas e lustres de palha — remete à natureza.",
  },
  {
    id: "romantico",
    nome: "Romântico",
    descricao:
      "Peças arredondadas, tons pastel, estampas florais — o máximo de aconchego.",
  },
  {
    id: "contemporaneo",
    nome: "Contemporâneo",
    descricao:
      "O estilo mais atual: madeira, laca, vidro e ferro combinados no mesmo ambiente.",
  },
] as const;

export type EstiloId = (typeof ESTILOS)[number]["id"];

export function nomeDoEstilo(id: string): string {
  return ESTILOS.find((e) => e.id === id)?.nome ?? id;
}
