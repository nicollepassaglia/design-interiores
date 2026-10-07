import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Em produção (Vercel) o token do Blob existe e a imagem vai para a nuvem.
// Sem token (desenvolvimento local), cai para a pasta public/uploads.
export async function salvarImagemEnviada(file: File): Promise<string> {
  const extensao = path.extname(file.name) || ".jpg";
  const nomeArquivo = `${randomUUID()}${extensao}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`renders/${nomeArquivo}`, file, { access: "public" });
    return blob.url;
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, nomeArquivo), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${nomeArquivo}`;
}
