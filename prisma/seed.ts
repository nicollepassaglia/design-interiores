import { PrismaClient } from "@prisma/client";
import { ESTILOS } from "../src/lib/estilos";
import { TAMANHOS } from "../src/lib/tamanhos";

const prisma = new PrismaClient();

async function main() {
  await prisma.parceiro.upsert({
    where: { slug: "teste" },
    update: {},
    create: {
      slug: "teste",
      nome: "Construtora Aurora (teste)",
      whatsapp: "5519999999999",
    },
  });

  for (const estilo of ESTILOS) {
    for (const tamanho of TAMANHOS) {
      await prisma.renderEstilo.upsert({
        where: { estilo_tamanho: { estilo: estilo.id, tamanho: tamanho.id } },
        update: {},
        create: {
          estilo: estilo.id,
          tamanho: tamanho.id,
          imagemUrl: `https://picsum.photos/seed/${estilo.id}-${tamanho.id}/1200/800`,
        },
      });
    }
  }

  console.log("Parceiro de exemplo criado: /teste");
  console.log(`Catálogo populado com ${ESTILOS.length * TAMANHOS.length} renders placeholder.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
