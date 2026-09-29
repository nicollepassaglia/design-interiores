export function ParceiroForm({
  action,
  valoresIniciais,
  modo,
}: {
  action: (formData: FormData) => void;
  valoresIniciais?: {
    slug: string;
    nome: string;
    whatsapp: string | null;
  };
  modo: "criar" | "editar";
}) {
  return (
    <form action={action} className="flex flex-col gap-4 max-w-xl">
      <label className="flex flex-col gap-2">
        <span className="label-caps text-charcoal/60">
          Slug (URL do link) {modo === "editar" && "— fixo"}
        </span>
        <input
          name="slug"
          defaultValue={valoresIniciais?.slug}
          disabled={modo === "editar"}
          placeholder="ex: construtora-aurora"
          required
          pattern="[a-z0-9-]+"
          title="Apenas letras minúsculas, números e hífen"
          className="rounded-sm border border-line bg-paper px-5 py-4 text-charcoal outline-none focus:border-terracotta disabled:opacity-50"
        />
        <span className="text-xs text-charcoal/40">
          Link do briefing: /{valoresIniciais?.slug ?? "slug-do-parceiro"}
        </span>
      </label>

      <label className="flex flex-col gap-2">
        <span className="label-caps text-charcoal/60">Nome do parceiro</span>
        <input
          name="nome"
          defaultValue={valoresIniciais?.nome}
          placeholder="ex: Construtora Aurora"
          required
          className="rounded-sm border border-line bg-paper px-5 py-4 text-charcoal outline-none focus:border-terracotta"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="label-caps text-charcoal/60">WhatsApp para contato</span>
        <input
          name="whatsapp"
          defaultValue={valoresIniciais?.whatsapp ?? ""}
          placeholder="ex: 5519999999999"
          className="rounded-sm border border-line bg-paper px-5 py-4 text-charcoal outline-none focus:border-terracotta"
        />
      </label>

      <button
        type="submit"
        className="mt-2 self-start rounded-full bg-charcoal px-10 py-4 text-sm tracking-wide text-cream transition hover:bg-terracotta cursor-pointer"
      >
        {modo === "criar" ? "Cadastrar parceiro" : "Salvar alterações"}
      </button>
    </form>
  );
}
