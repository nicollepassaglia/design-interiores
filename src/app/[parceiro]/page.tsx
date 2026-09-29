import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { QuizFlow, type CatalogoRenders } from "@/components/quiz/QuizFlow";
import { ESTILOS, type EstiloId } from "@/lib/estilos";
import { TAMANHOS } from "@/lib/tamanhos";
import { buscarRendersParaTamanho } from "@/lib/renders";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ parceiro: string }>;
}) {
  const { parceiro: slug } = await params;

  const parceiro = await prisma.parceiro.findUnique({ where: { slug } });
  if (!parceiro) notFound();

  const estiloIds: EstiloId[] = ESTILOS.map((e) => e.id);
  const entradas = await Promise.all(
    TAMANHOS.map(async (t) => [t.id, await buscarRendersParaTamanho(t.id, estiloIds)] as const)
  );
  const catalogo = Object.fromEntries(entradas) as CatalogoRenders;

  return (
    <QuizFlow
      parceiro={{ nome: parceiro.nome, whatsapp: parceiro.whatsapp }}
      catalogo={catalogo}
    />
  );
}
