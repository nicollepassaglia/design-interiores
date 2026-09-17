import { ESTILOS, type Estilo } from "./estilos";
import { PERGUNTAS } from "./perguntas";

export type Respostas = Record<number, Estilo>;

export function calcularResultado(respostas: Respostas): Estilo {
  const pontos: Record<Estilo, number> = Object.fromEntries(
    ESTILOS.map((e) => [e, 0])
  ) as Record<Estilo, number>;

  for (const pergunta of PERGUNTAS) {
    const escolha = respostas[pergunta.id];
    if (escolha) pontos[escolha] += pergunta.pontos;
  }

  const maiorPontuacao = Math.max(...ESTILOS.map((e) => pontos[e]));
  const empatados = ESTILOS.filter((e) => pontos[e] === maiorPontuacao);

  if (empatados.length === 1) return empatados[0];

  const desempate = respostas[7];
  if (desempate && empatados.includes(desempate)) return desempate;

  return empatados[0];
}
