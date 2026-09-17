import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function salvarImagemEnviada(file: File): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });

  const extensao = path.extname(file.name) || ".jpg";
  const nomeArquivo = `${randomUUID()}${extensao}`;
  const destino = path.join(UPLOAD_DIR, nomeArquivo);

  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(destino, bytes);

  return `/uploads/${nomeArquivo}`;
}
