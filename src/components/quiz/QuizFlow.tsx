"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { PERGUNTAS } from "@/lib/perguntas";
import { calcularResultado, type Respostas } from "@/lib/pontuacao";
import { ESTILO_INFO, CAMPO_IMAGEM_POR_ESTILO, type Estilo } from "@/lib/estilos";

export type EmpreendimentoParaQuiz = {
  idPlanta: string;
  nomeEmpreendimento: string;
  whatsapp: string | null;
  imagemQuenteOrganico: string;
  imagemBohoTropical: string;
  imagemRusticoAconchegante: string;
  imagemContemporaneoVibrante: string;
};

type Etapa = "landing" | "quiz" | "resultado";

export function QuizFlow({
  empreendimento,
}: {
  empreendimento: EmpreendimentoParaQuiz;
}) {
  const [etapa, setEtapa] = useState<Etapa>("landing");
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<Respostas>({});

  const pergunta = PERGUNTAS[indice];
  const progresso = Math.round(((indice) / PERGUNTAS.length) * 100);

  const resultado = useMemo(() => {
    if (etapa !== "resultado") return null;
    return calcularResultado(respostas);
  }, [etapa, respostas]);

  function escolher(estilo: Estilo) {
    const novasRespostas = { ...respostas, [pergunta.id]: estilo };
    setRespostas(novasRespostas);

    if (indice + 1 < PERGUNTAS.length) {
      setIndice(indice + 1);
    } else {
      setEtapa("resultado");
    }
  }

  function recomecar() {
    setRespostas({});
    setIndice(0);
    setEtapa("landing");
  }

  if (etapa === "landing") {
    return (
      <div
        key="landing"
        className="animate-fade-up flex flex-1 flex-col items-center justify-center px-6 py-24 text-center"
      >
        <p className="label-caps text-olive mb-6">{empreendimento.nomeEmpreendimento}</p>
        <h1 className="font-serif-display text-4xl sm:text-6xl leading-[1.05] max-w-2xl text-charcoal">
          Descubra o estilo que combina com o seu apê
        </h1>
        <p className="mt-6 max-w-md text-base sm:text-lg text-charcoal/70">
          7 perguntas rápidas. No final, veja uma imagem do seu apartamento
          decorado no estilo que mais combina com você.
        </p>
        <button
          onClick={() => setEtapa("quiz")}
          className="mt-10 rounded-full bg-charcoal px-10 py-4 text-sm tracking-wide text-cream transition hover:bg-terracotta cursor-pointer"
        >
          Começar
        </button>
      </div>
    );
  }

  if (etapa === "quiz") {
    return (
      <div key={`quiz-${indice}`} className="flex flex-1 flex-col px-6 py-12 sm:py-20">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-10 flex items-center gap-4">
            <span className="label-caps text-olive shrink-0">
              {indice + 1} / {PERGUNTAS.length}
            </span>
            <div className="h-px w-full bg-line relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-terracotta transition-all duration-500"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>

          <h2 className="animate-fade-up font-serif-display text-2xl sm:text-4xl leading-tight text-charcoal mb-10">
            {pergunta.texto}
          </h2>

          {pergunta.visual ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {pergunta.alternativas.map((alt) => (
                <button
                  key={alt.estilo}
                  onClick={() => escolher(alt.estilo)}
                  className="group animate-fade-up relative aspect-[4/5] overflow-hidden rounded-sm border border-line text-left cursor-pointer"
                >
                  <Image
                    src={empreendimento[CAMPO_IMAGEM_POR_ESTILO[alt.estilo]]}
                    alt={ESTILO_INFO[alt.estilo].nome}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 45vw, 320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                  <span className="label-caps absolute bottom-3 left-3 text-cream">
                    {ESTILO_INFO[alt.estilo].nome}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {pergunta.alternativas.map((alt, i) => (
                <button
                  key={alt.estilo}
                  onClick={() => escolher(alt.estilo)}
                  className="animate-fade-up group flex items-center justify-between rounded-sm border border-line bg-paper px-6 py-5 text-left text-base sm:text-lg text-charcoal transition hover:border-terracotta hover:bg-sand/40 cursor-pointer"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span>{alt.texto}</span>
                  <span className="text-line transition group-hover:text-terracotta">
                    →
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (resultado) {
    const info = ESTILO_INFO[resultado];
    const imagemUrl = empreendimento[CAMPO_IMAGEM_POR_ESTILO[resultado]];
    const mensagem = encodeURIComponent(
      `Olá! Fiz o quiz de estilo do ${empreendimento.nomeEmpreendimento} e meu resultado foi "${info.nome}". Quero saber mais sobre a consultoria completa!`
    );
    const linkWhatsapp = empreendimento.whatsapp
      ? `https://wa.me/${empreendimento.whatsapp.replace(/\D/g, "")}?text=${mensagem}`
      : undefined;

    return (
      <div key="resultado" className="animate-fade-up flex flex-1 flex-col items-center px-6 py-16 sm:py-20 text-center">
        <p className="label-caps text-olive mb-4">Seu resultado</p>
        <h1 className="font-serif-display text-3xl sm:text-5xl leading-tight max-w-2xl text-charcoal mb-3">
          Baseado no que você respondeu, seu apê pode ficar assim
        </h1>
        <p className="label-caps text-terracotta mb-10">{info.nome}</p>

        <div className="relative w-full max-w-3xl aspect-[16/10] overflow-hidden rounded-sm border border-line">
          <Image
            src={imagemUrl}
            alt={`${empreendimento.nomeEmpreendimento} decorado no estilo ${info.nome}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        <p className="mt-8 max-w-xl text-sm sm:text-base text-charcoal/70">
          Esse é só um dos caminhos possíveis para o seu estilo. Quer ver mais
          opções e receber seu moodboard completo com as peças?
        </p>

        <a
          href={linkWhatsapp ?? "#contato"}
          target={linkWhatsapp ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="mt-8 rounded-full bg-terracotta px-10 py-4 text-sm tracking-wide text-cream transition hover:bg-charcoal"
        >
          Quero minha consultoria
        </a>

        <button
          onClick={recomecar}
          className="mt-6 label-caps text-charcoal/50 underline underline-offset-4 transition hover:text-charcoal cursor-pointer"
        >
          Refazer o quiz
        </button>
      </div>
    );
  }

  return null;
}
