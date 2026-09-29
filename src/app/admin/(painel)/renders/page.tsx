import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { salvarRenderEstilo, excluirRenderEstilo } from "@/lib/admin-actions";
import { ESTILOS } from "@/lib/estilos";
import { TAMANHOS } from "@/lib/tamanhos";

export default async function CatalogoRendersPage() {
  const renders = await prisma.renderEstilo.findMany();
  const mapa = new Map(renders.map((r) => [`${r.estilo}-${r.tamanho}`, r]));

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="font-serif-display text-3xl text-charcoal mb-2">
        Catálogo de renders
      </h1>
      <p className="text-sm text-charcoal/60 mb-10 max-w-2xl">
        Uma imagem por combinação de estilo e tamanho. Não precisa preencher
        tudo de uma vez — enquanto uma combinação estiver vazia, o briefing usa
        automaticamente outro tamanho já cadastrado daquele estilo.
      </p>

      <div className="flex flex-col gap-10">
        {ESTILOS.map((estilo) => (
          <div key={estilo.id}>
            <h2 className="font-serif-display text-xl text-charcoal mb-4">
              {estilo.nome}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TAMANHOS.map((tamanho) => {
                const render = mapa.get(`${estilo.id}-${tamanho.id}`);
                return (
                  <div
                    key={tamanho.id}
                    className="flex flex-col gap-3 rounded-sm border border-line p-4"
                  >
                    <p className="label-caps text-charcoal/60">
                      {tamanho.nome} · {tamanho.faixa}
                    </p>

                    {render ? (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line">
                        <Image
                          src={render.imagemUrl}
                          alt={`${estilo.nome} — ${tamanho.nome}`}
                          fill
                          className="object-cover"
                          sizes="300px"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center rounded-sm border border-dashed border-line text-xs text-charcoal/30">
                        Sem imagem
                      </div>
                    )}

                    <form action={salvarRenderEstilo} className="flex flex-col gap-2">
                      <input type="hidden" name="estilo" value={estilo.id} />
                      <input type="hidden" name="tamanho" value={tamanho.id} />
                      <input
                        type="file"
                        name="imagem"
                        accept="image/*"
                        required
                        className="text-xs text-charcoal/60 file:mr-2 file:rounded-full file:border-0 file:bg-sand file:px-3 file:py-1.5 file:text-xs file:cursor-pointer"
                      />
                      <button
                        type="submit"
                        className="label-caps self-start text-olive hover:text-charcoal cursor-pointer"
                      >
                        {render ? "Substituir" : "Enviar"}
                      </button>
                    </form>

                    {render && (
                      <form action={excluirRenderEstilo}>
                        <input type="hidden" name="id" value={render.id} />
                        <button className="label-caps text-terracotta/60 hover:text-terracotta cursor-pointer">
                          Remover
                        </button>
                      </form>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
