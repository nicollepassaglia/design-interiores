import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { atualizarParceiro } from "@/lib/admin-actions";
import { ParceiroForm } from "@/components/admin/ParceiroForm";

export default async function EditarParceiroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parceiro = await prisma.parceiro.findUnique({ where: { id } });
  if (!parceiro) notFound();

  const acao = atualizarParceiro.bind(null, id);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="font-serif-display text-3xl text-charcoal mb-8">
        Editar {parceiro.nome}
      </h1>
      <ParceiroForm action={acao} valoresIniciais={parceiro} modo="editar" />
    </div>
  );
}
