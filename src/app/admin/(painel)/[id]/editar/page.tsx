import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { atualizarEmpreendimento } from "@/lib/admin-actions";
import { EmpreendimentoForm } from "@/components/admin/EmpreendimentoForm";

export default async function EditarEmpreendimentoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const empreendimento = await prisma.empreendimento.findUnique({ where: { id } });
  if (!empreendimento) notFound();

  const acao = atualizarEmpreendimento.bind(null, id);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="font-serif-display text-3xl text-charcoal mb-8">
        Editar {empreendimento.nomeEmpreendimento}
      </h1>
      <EmpreendimentoForm action={acao} valoresIniciais={empreendimento} modo="editar" />
    </div>
  );
}
