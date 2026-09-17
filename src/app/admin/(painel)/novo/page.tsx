import { criarEmpreendimento } from "@/lib/admin-actions";
import { EmpreendimentoForm } from "@/components/admin/EmpreendimentoForm";

export default function NovoEmpreendimentoPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="font-serif-display text-3xl text-charcoal mb-8">
        Novo empreendimento
      </h1>
      <EmpreendimentoForm action={criarEmpreendimento} modo="criar" />
    </div>
  );
}
