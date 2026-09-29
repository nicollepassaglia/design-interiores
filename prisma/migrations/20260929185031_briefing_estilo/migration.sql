-- CreateTable
CREATE TABLE "Parceiro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "whatsapp" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RenderEstilo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "estilo" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Parceiro_slug_key" ON "Parceiro"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RenderEstilo_estilo_tamanho_key" ON "RenderEstilo"("estilo", "tamanho");
