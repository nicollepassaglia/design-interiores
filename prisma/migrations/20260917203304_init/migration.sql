-- CreateTable
CREATE TABLE "Empreendimento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idPlanta" TEXT NOT NULL,
    "nomeEmpreendimento" TEXT NOT NULL,
    "imagemQuenteOrganico" TEXT NOT NULL,
    "imagemBohoTropical" TEXT NOT NULL,
    "imagemRusticoAconchegante" TEXT NOT NULL,
    "imagemContemporaneoVibrante" TEXT NOT NULL,
    "imagemPlantaCrua" TEXT,
    "whatsapp" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Empreendimento_idPlanta_key" ON "Empreendimento"("idPlanta");
