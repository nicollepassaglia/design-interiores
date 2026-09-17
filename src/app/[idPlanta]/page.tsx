import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { QuizFlow } from "@/components/quiz/QuizFlow";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ idPlanta: string }>;
}) {
  const { idPlanta } = await params;

  const empreendimento = await prisma.empreendimento.findUnique({
    where: { idPlanta },
  });

  if (!empreendimento) notFound();

  return (
    <QuizFlow
      empreendimento={{
        idPlanta: empreendimento.idPlanta,
        nomeEmpreendimento: empreendimento.nomeEmpreendimento,
        whatsapp: empreendimento.whatsapp,
        imagemQuenteOrganico: empreendimento.imagemQuenteOrganico,
        imagemBohoTropical: empreendimento.imagemBohoTropical,
        imagemRusticoAconchegante: empreendimento.imagemRusticoAconchegante,
        imagemContemporaneoVibrante: empreendimento.imagemContemporaneoVibrante,
      }}
    />
  );
}
