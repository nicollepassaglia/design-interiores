import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.empreendimento.upsert({
    where: { idPlanta: "edificio-aurora-2q" },
    update: {},
    create: {
      idPlanta: "edificio-aurora-2q",
      nomeEmpreendimento: "Edifício Aurora — Planta 2 quartos",
      whatsapp: "5519999999999",
      imagemQuenteOrganico: "https://picsum.photos/seed/quente-organico/1200/800",
      imagemBohoTropical: "https://picsum.photos/seed/boho-tropical/1200/800",
      imagemRusticoAconchegante: "https://picsum.photos/seed/rustico-aconchegante/1200/800",
      imagemContemporaneoVibrante: "https://picsum.photos/seed/contemporaneo-vibrante/1200/800",
      imagemPlantaCrua: "https://picsum.photos/seed/planta-crua/1200/800",
    },
  });

  console.log("Empreendimento de exemplo criado: /edificio-aurora-2q");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
