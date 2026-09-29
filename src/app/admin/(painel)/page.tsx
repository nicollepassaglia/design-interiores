import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { excluirParceiro } from "@/lib/admin-actions";

export default async function AdminListaPage() {
  const parceiros = await prisma.parceiro.findMany({
    orderBy: { criadoEm: "desc" },
  });

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif-display text-3xl text-charcoal">Parceiros</h1>
        <Link
          href="/admin/renders"
          className="label-caps text-olive hover:text-charcoal"
        >
          Catálogo de renders →
        </Link>
      </div>

      {parceiros.length === 0 ? (
        <div className="rounded-sm border border-dashed border-line px-8 py-16 text-center">
          <p className="text-charcoal/60 mb-6">Nenhum parceiro cadastrado ainda.</p>
          <Link
            href="/admin/novo"
            className="rounded-full bg-charcoal px-8 py-3 text-sm tracking-wide text-cream transition hover:bg-terracotta"
          >
            Cadastrar o primeiro
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-line border-y border-line">
          {parceiros.map((p) => (
            <li key={p.id} className="flex items-center gap-5 py-5">
              <div className="flex-1 min-w-0">
                <p className="text-charcoal font-medium truncate">{p.nome}</p>
                <p className="label-caps text-charcoal/40">/{p.slug}</p>
              </div>
              <Link
                href={`/${p.slug}`}
                target="_blank"
                className="label-caps text-olive hover:text-charcoal"
              >
                Ver link
              </Link>
              <Link
                href={`/admin/${p.id}/editar`}
                className="label-caps text-charcoal/60 hover:text-charcoal"
              >
                Editar
              </Link>
              <form action={excluirParceiro}>
                <input type="hidden" name="id" value={p.id} />
                <button className="label-caps text-terracotta/70 hover:text-terracotta cursor-pointer">
                  Excluir
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
