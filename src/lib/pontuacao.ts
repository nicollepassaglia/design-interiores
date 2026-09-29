import { ESTILOS, type EstiloId } from "./estilos";
import { PERGUNTAS } from "./perguntas";

export type Respostas = Record<number, EstiloId>;

export function calcularResultado(respostas: Respostas): EstiloId {
  const pontos = Object.fromEntries(
    ESTILOS.map((e) => [e.id, 0])
  ) as Record<EstiloId, number>;

  for (const pergunta of PERGUNTAS) {
    const escolha = respostas[pergunta.id];
    if (escolha) pontos[escolha] += pergunta.pontos;
  }

  const maiorPontuacao = Math.max(...ESTILOS.map((e) => pontos[e.id]));
  const empatados = ESTILOS.map((e) => e.id).filter((id) => pontos[id] === maiorPontuacao);

  if (empatados.length === 1) return empatados[0];

  const desempate = respostas[7];
  if (desempate && empatados.includes(desempate)) return desempate;

  return empatados[0];
}
