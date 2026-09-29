"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { salvarImagemEnviada } from "@/lib/upload";
import { hasAdminSession } from "@/lib/admin-auth";

async function exigirSessao() {
  if (!(await hasAdminSession())) throw new Error("Não autorizado");
}

// --- Parceiros ---

export async function criarParceiro(formData: FormData) {
  await exigirSessao();

  const slug = String(formData.get("slug") ?? "").trim();
  const nome = String(formData.get("nome") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();

  if (!slug || !nome) {
    throw new Error("Slug e nome são obrigatórios");
  }

  await prisma.parceiro.create({
    data: { slug, nome, whatsapp: whatsapp || null },
  });

  revalidatePath("/admin");
  redirect("/admin");
}

export async function atualizarParceiro(id: string, formData: FormData) {
  await exigirSessao();

  const nome = String(formData.get("nome") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();

  await prisma.parceiro.update({
    where: { id },
    data: { nome: nome || undefined, whatsapp: whatsapp || null },
  });

  revalidatePath("/admin");
  redirect("/admin");
}

export async function excluirParceiro(formData: FormData) {
  await exigirSessao();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("ID inválido");

  await prisma.parceiro.delete({ where: { id } });
  revalidatePath("/admin");
}

// --- Catálogo de renders (estilo x tamanho) ---

export async function salvarRenderEstilo(formData: FormData) {
  await exigirSessao();

  const estilo = String(formData.get("estilo") ?? "");
  const tamanho = String(formData.get("tamanho") ?? "");
  const arquivo = formData.get("imagem");

  if (!estilo || !tamanho) throw new Error("Estilo e tamanho são obrigatórios");
  if (!(arquivo instanceof File) || arquivo.size === 0) {
    throw new Error("Selecione uma imagem");
  }

  const imagemUrl = await salvarImagemEnviada(arquivo);

  await prisma.renderEstilo.upsert({
    where: { estilo_tamanho: { estilo, tamanho } },
    update: { imagemUrl },
    create: { estilo, tamanho, imagemUrl },
  });

  revalidatePath("/admin/renders");
}

export async function excluirRenderEstilo(formData: FormData) {
  await exigirSessao();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("ID inválido");

  await prisma.renderEstilo.delete({ where: { id } });
  revalidatePath("/admin/renders");
}
