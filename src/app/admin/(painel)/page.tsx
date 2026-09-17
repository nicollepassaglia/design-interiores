import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { excluirEmpreendimento } from "@/lib/admin-actions";

export default async function AdminListaPage() {
  const empreendimentos = await prisma.empreendimento.findMany({
    orderBy: { criadoEm: "desc" },
  });

  return (
    <div className="mx-auto w-full max-w-4xl">
      <h1 className="font-serif-display text-3xl text-charcoal mb-8">
        Empreendimentos cadastrados
      </h1>

      {empreendimentos.length === 0 ? (
        <div className="rounded-sm border border-dashed border-line px-8 py-16 text-center">
          <p className="text-charcoal/60 mb-6">Nenhum empreendimento cadastrado ainda.</p>
          <Link
            href="/admin/novo"
            className="rounded-full bg-charcoal px-8 py-3 text-sm tracking-wide text-cream transition hover:bg-terracotta"
          >
            Cadastrar o primeiro
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-line border-y border-line">
          {empreendimentos.map((e) => (
            <li key={e.id} className="flex items-center gap-5 py-5">
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-sm border border-line">
                <Image
                  src={e.imagemQuenteOrganico}
                  alt={e.nomeEmpreendimento}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-charcoal font-medium truncate">{e.nomeEmpreendimento}</p>
                <p className="label-caps text-charcoal/40">{e.idPlanta}</p>
              </div>
              <Link
                href={`/${e.idPlanta}`}
                target="_blank"
                className="label-caps text-olive hover:text-charcoal"
              >
                Ver link
              </Link>
              <Link
                href={`/admin/${e.id}/editar`}
                className="label-caps text-charcoal/60 hover:text-charcoal"
              >
                Editar
              </Link>
              <form action={excluirEmpreendimento}>
                <input type="hidden" name="id" value={e.id} />
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
