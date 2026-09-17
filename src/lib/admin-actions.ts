"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { salvarImagemEnviada } from "@/lib/upload";
import { hasAdminSession } from "@/lib/admin-auth";

async function exigirSessao() {
  if (!(await hasAdminSession())) throw new Error("Não autorizado");
}

async function campoImagem(formData: FormData, campo: string, atual?: string) {
  const arquivo = formData.get(campo);
  if (arquivo instanceof File && arquivo.size > 0) {
    return salvarImagemEnviada(arquivo);
  }
  return atual;
}

export async function criarEmpreendimento(formData: FormData) {
  await exigirSessao();

  const idPlanta = String(formData.get("idPlanta") ?? "").trim();
  const nomeEmpreendimento = String(formData.get("nomeEmpreendimento") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();

  if (!idPlanta || !nomeEmpreendimento) {
    throw new Error("ID da planta e nome do empreendimento são obrigatórios");
  }

  const [
    imagemQuenteOrganico,
    imagemBohoTropical,
    imagemRusticoAconchegante,
    imagemContemporaneoVibrante,
    imagemPlantaCrua,
  ] = await Promise.all([
    campoImagem(formData, "imagemQuenteOrganico"),
    campoImagem(formData, "imagemBohoTropical"),
    campoImagem(formData, "imagemRusticoAconchegante"),
    campoImagem(formData, "imagemContemporaneoVibrante"),
    campoImagem(formData, "imagemPlantaCrua"),
  ]);

  if (
    !imagemQuenteOrganico ||
    !imagemBohoTropical ||
    !imagemRusticoAconchegante ||
    !imagemContemporaneoVibrante
  ) {
    throw new Error("As 4 imagens de estilo são obrigatórias");
  }

  await prisma.empreendimento.create({
    data: {
      idPlanta,
      nomeEmpreendimento,
      whatsapp: whatsapp || null,
      imagemQuenteOrganico,
      imagemBohoTropical,
      imagemRusticoAconchegante,
      imagemContemporaneoVibrante,
      imagemPlantaCrua: imagemPlantaCrua || null,
    },
  });

  revalidatePath("/admin");
  redirect("/admin");
}

export async function atualizarEmpreendimento(id: string, formData: FormData) {
  await exigirSessao();

  const atual = await prisma.empreendimento.findUniqueOrThrow({ where: { id } });

  const nomeEmpreendimento = String(formData.get("nomeEmpreendimento") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();

  const [
    imagemQuenteOrganico,
    imagemBohoTropical,
    imagemRusticoAconchegante,
    imagemContemporaneoVibrante,
    imagemPlantaCrua,
  ] = await Promise.all([
    campoImagem(formData, "imagemQuenteOrganico", atual.imagemQuenteOrganico),
    campoImagem(formData, "imagemBohoTropical", atual.imagemBohoTropical),
    campoImagem(formData, "imagemRusticoAconchegante", atual.imagemRusticoAconchegante),
    campoImagem(formData, "imagemContemporaneoVibrante", atual.imagemContemporaneoVibrante),
    campoImagem(formData, "imagemPlantaCrua", atual.imagemPlantaCrua ?? undefined),
  ]);

  await prisma.empreendimento.update({
    where: { id },
    data: {
      nomeEmpreendimento: nomeEmpreendimento || atual.nomeEmpreendimento,
      whatsapp: whatsapp || null,
      imagemQuenteOrganico,
      imagemBohoTropical,
      imagemRusticoAconchegante,
      imagemContemporaneoVibrante,
      imagemPlantaCrua: imagemPlantaCrua || null,
    },
  });

  revalidatePath("/admin");
  redirect("/admin");
}

export async function excluirEmpreendimento(formData: FormData) {
  await exigirSessao();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("ID inválido");

  await prisma.empreendimento.delete({ where: { id } });
  revalidatePath("/admin");
}
