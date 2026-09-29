export const TAMANHOS = [
  { id: "pequeno", nome: "Pequeno", faixa: "até 70m²" },
  { id: "medio", nome: "Médio", faixa: "70m² a 110m²" },
  { id: "grande", nome: "Grande", faixa: "acima de 110m²" },
] as const;

export type TamanhoId = (typeof TAMANHOS)[number]["id"];

export const COMODOS = [
  "Sala de estar",
  "Quarto / Suíte",
  "Cozinha",
  "Banheiro",
  "Home office",
  "Varanda / Área externa",
] as const;
