import { prisma } from "./prisma";
import type { EstiloId } from "./estilos";
import type { TamanhoId } from "./tamanhos";

// Busca o render exato (estilo + tamanho). Se não existir ainda (cobertura
// parcial do catálogo), cai para qualquer render daquele estilo disponível,
// de outro tamanho — assim o quiz funciona mesmo antes de todos os renders
// estarem prontos.
export async function buscarRender(estilo: EstiloId, tamanho: TamanhoId) {
  const exato = await prisma.renderEstilo.findUnique({
    where: { estilo_tamanho: { estilo, tamanho } },
  });
  if (exato) return exato;

  return prisma.renderEstilo.findFirst({
    where: { estilo },
    orderBy: { criadoEm: "asc" },
  });
}

export async function buscarRendersParaTamanho(tamanho: TamanhoId, estilos: readonly EstiloId[]) {
  const resultados = await Promise.all(
    estilos.map((estilo) => buscarRender(estilo, tamanho))
  );
  return Object.fromEntries(
    estilos.map((estilo, i) => [estilo, resultados[i]?.imagemUrl ?? null])
  ) as Record<EstiloId, string | null>;
}
