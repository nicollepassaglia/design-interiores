export const ESTILOS = [
  "quente_organico",
  "boho_tropical",
  "rustico_aconchegante",
  "contemporaneo_vibrante",
] as const;

export type Estilo = (typeof ESTILOS)[number];

export const ESTILO_INFO: Record<Estilo, { nome: string; descricao: string; referencia: string }> = {
  quente_organico: {
    nome: "Quente Orgânico",
    descricao: "Terracota, tons terrosos, muxarabi, plantas, madeira natural.",
    referencia: "México dos anos 1940",
  },
  boho_tropical: {
    nome: "Boho Tropical",
    descricao: "Rattan, vime, tecidos estampados, mistura cultural, clima despojado e alegre.",
    referencia: "Praia colorida no Nordeste",
  },
  rustico_aconchegante: {
    nome: "Rústico Aconchegante",
    descricao: "Madeira crua, linho, tons neutros quentes, texturas naturais.",
    referencia: "Casa de vó atualizada",
  },
  contemporaneo_vibrante: {
    nome: "Contemporâneo Vibrante",
    descricao: "Formas orgânicas atuais, uma cor de destaque forte, linhas mais limpas.",
    referencia: "Apartamento novo numa capital",
  },
};

export const CAMPO_IMAGEM_POR_ESTILO: Record<Estilo, "imagemQuenteOrganico" | "imagemBohoTropical" | "imagemRusticoAconchegante" | "imagemContemporaneoVibrante"> = {
  quente_organico: "imagemQuenteOrganico",
  boho_tropical: "imagemBohoTropical",
  rustico_aconchegante: "imagemRusticoAconchegante",
  contemporaneo_vibrante: "imagemContemporaneoVibrante",
};
