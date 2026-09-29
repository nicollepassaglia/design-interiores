import { criarParceiro } from "@/lib/admin-actions";
import { ParceiroForm } from "@/components/admin/ParceiroForm";

export default function NovoParceiroPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="font-serif-display text-3xl text-charcoal mb-8">
        Novo parceiro
      </h1>
      <ParceiroForm action={criarParceiro} modo="criar" />
    </div>
  );
}
