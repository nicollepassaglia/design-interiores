"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { PERGUNTAS } from "@/lib/perguntas";
import { calcularResultado, type Respostas } from "@/lib/pontuacao";
import { nomeDoEstilo, type EstiloId } from "@/lib/estilos";
import { TAMANHOS, COMODOS, type TamanhoId } from "@/lib/tamanhos";

export type CatalogoRenders = Record<TamanhoId, Record<EstiloId, string | null>>;

export type ParceiroParaQuiz = {
  nome: string;
  whatsapp: string | null;
};

type Etapa =
  | "landing"
  | "tamanho"
  | "quantidadeComodos"
  | "quaisComodos"
  | "quiz"
  | "resultado";

type QuantidadeComodos = "1" | "2" | "3+";

const OPCOES_QUANTIDADE: { valor: QuantidadeComodos; label: string; minSelecao: number }[] = [
  { valor: "1", label: "Apenas 1 cômodo", minSelecao: 1 },
  { valor: "2", label: "2 cômodos", minSelecao: 2 },
  { valor: "3+", label: "3 ou mais cômodos", minSelecao: 3 },
];

export function QuizFlow({
  parceiro,
  catalogo,
}: {
  parceiro: ParceiroParaQuiz;
  catalogo: CatalogoRenders;
}) {
  const [etapa, setEtapa] = useState<Etapa>("landing");
  const [tamanho, setTamanho] = useState<TamanhoId | null>(null);
  const [quantidadeComodos, setQuantidadeComodos] = useState<QuantidadeComodos | null>(null);
  const [comodos, setComodos] = useState<string[]>([]);
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<Respostas>({});

  const pergunta = PERGUNTAS[indice];
  const totalEtapas = PERGUNTAS.length + 3;
  const progresso = Math.round(((indice + 3) / totalEtapas) * 100);

  const resultado = useMemo(() => {
    if (etapa !== "resultado") return null;
    return calcularResultado(respostas);
  }, [etapa, respostas]);

  function escolherEstilo(estilo: EstiloId) {
    const novasRespostas = { ...respostas, [pergunta.id]: estilo };
    setRespostas(novasRespostas);

    if (indice + 1 < PERGUNTAS.length) {
      setIndice(indice + 1);
    } else {
      setEtapa("resultado");
    }
  }

  function alternarComodo(comodo: string) {
    setComodos((atual) =>
      atual.includes(comodo) ? atual.filter((c) => c !== comodo) : [...atual, comodo]
    );
  }

  function recomecar() {
    setRespostas({});
    setIndice(0);
    setTamanho(null);
    setQuantidadeComodos(null);
    setComodos([]);
    setEtapa("landing");
  }

  const opcaoQuantidade = OPCOES_QUANTIDADE.find((o) => o.valor === quantidadeComodos);
  const comodosValidos = opcaoQuantidade ? comodos.length >= opcaoQuantidade.minSelecao : false;

  if (etapa === "landing") {
    return (
      <div
        key="landing"
        className="animate-fade-up flex flex-1 flex-col items-center justify-center px-6 py-24 text-center"
      >
        <p className="label-caps text-olive mb-6">{parceiro.nome}</p>
        <h1 className="font-serif-display text-4xl sm:text-6xl leading-[1.05] max-w-2xl text-charcoal">
          Descubra o estilo que combina com você
        </h1>
        <p className="mt-6 max-w-md text-base sm:text-lg text-charcoal/70">
          Um briefing rápido pra gente entender seu gosto e te mostrar como um
          ambiente no seu estilo pode ficar.
        </p>
        <button
          onClick={() => setEtapa("tamanho")}
          className="mt-10 rounded-full bg-charcoal px-10 py-4 text-sm tracking-wide text-cream transition hover:bg-terracotta cursor-pointer"
        >
          Começar
        </button>
      </div>
    );
  }

  const barraProgresso = (
    <div className="mb-10 flex items-center gap-4">
      <div className="h-px w-full bg-line relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-terracotta transition-all duration-500"
          style={{ width: `${progresso}%` }}
        />
      </div>
    </div>
  );

  if (etapa === "tamanho") {
    return (
      <div key="tamanho" className="flex flex-1 flex-col px-6 py-12 sm:py-20">
        <div className="mx-auto w-full max-w-2xl">
          {barraProgresso}
          <h2 className="animate-fade-up font-serif-display text-2xl sm:text-4xl leading-tight text-charcoal mb-10">
            Qual é o tamanho do seu apartamento?
          </h2>
          <div className="flex flex-col gap-3">
            {TAMANHOS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  setTamanho(t.id);
                  setEtapa("quantidadeComodos");
                }}
                className="animate-fade-up group flex items-center justify-between rounded-sm border border-line bg-paper px-6 py-5 text-left transition hover:border-terracotta hover:bg-sand/40 cursor-pointer"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span>
                  <span className="block text-base sm:text-lg text-charcoal">{t.nome}</span>
                  <span className="label-caps text-charcoal/40">{t.faixa}</span>
                </span>
                <span className="text-line transition group-hover:text-terracotta">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (etapa === "quantidadeComodos") {
    return (
      <div key="quantidade" className="flex flex-1 flex-col px-6 py-12 sm:py-20">
        <div className="mx-auto w-full max-w-2xl">
          {barraProgresso}
          <h2 className="animate-fade-up font-serif-display text-2xl sm:text-4xl leading-tight text-charcoal mb-10">
            Quantos cômodos você deseja decorar?
          </h2>
          <div className="flex flex-col gap-3">
            {OPCOES_QUANTIDADE.map((o, i) => (
              <button
                key={o.valor}
                onClick={() => {
                  setQuantidadeComodos(o.valor);
                  setComodos([]);
                  setEtapa("quaisComodos");
                }}
                className="animate-fade-up group flex items-center justify-between rounded-sm border border-line bg-paper px-6 py-5 text-left text-base sm:text-lg text-charcoal transition hover:border-terracotta hover:bg-sand/40 cursor-pointer"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span>{o.label}</span>
                <span className="text-line transition group-hover:text-terracotta">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (etapa === "quaisComodos" && opcaoQuantidade) {
    return (
      <div key="comodos" className="flex flex-1 flex-col px-6 py-12 sm:py-20">
        <div className="mx-auto w-full max-w-2xl">
          {barraProgresso}
          <h2 className="animate-fade-up font-serif-display text-2xl sm:text-4xl leading-tight text-charcoal mb-2">
            Quais cômodos são?
          </h2>
          <p className="text-sm text-charcoal/50 mb-10">
            Selecione {opcaoQuantidade.valor === "3+" ? "pelo menos 3" : opcaoQuantidade.minSelecao}
            .
          </p>
          <div className="flex flex-col gap-3">
            {COMODOS.map((comodo, i) => {
              const selecionado = comodos.includes(comodo);
              return (
                <button
                  key={comodo}
                  onClick={() => alternarComodo(comodo)}
                  className={`animate-fade-up flex items-center justify-between rounded-sm border px-6 py-5 text-left text-base sm:text-lg transition cursor-pointer ${
                    selecionado
                      ? "border-terracotta bg-sand/50 text-charcoal"
                      : "border-line bg-paper text-charcoal hover:border-terracotta/60"
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span>{comodo}</span>
                  <span className={selecionado ? "text-terracotta" : "text-line"}>
                    {selecionado ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            disabled={!comodosValidos}
            onClick={() => setEtapa("quiz")}
            className="mt-8 self-start rounded-full bg-charcoal px-10 py-4 text-sm tracking-wide text-cream transition hover:bg-terracotta disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  if (etapa === "quiz") {
    return (
      <div key={`quiz-${indice}`} className="flex flex-1 flex-col px-6 py-12 sm:py-20">
        <div className="mx-auto w-full max-w-2xl">
          {barraProgresso}

          <h2 className="animate-fade-up font-serif-display text-2xl sm:text-4xl leading-tight text-charcoal mb-10">
            {pergunta.texto}
          </h2>

          {pergunta.visual ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {pergunta.alternativas.map((alt) => {
                const url = tamanho ? catalogo[tamanho]?.[alt.estilo] : null;
                return (
                  <button
                    key={alt.estilo}
                    onClick={() => escolherEstilo(alt.estilo)}
                    className="group animate-fade-up relative aspect-[4/5] overflow-hidden rounded-sm border border-line text-left cursor-pointer bg-sand/40"
                  >
                    {url && (
                      <Image
                        src={url}
                        alt={nomeDoEstilo(alt.estilo)}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 45vw, 320px"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                    <span className="label-caps absolute bottom-3 left-3 text-cream">
                      {nomeDoEstilo(alt.estilo)}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {pergunta.alternativas.map((alt, i) => (
                <button
                  key={alt.estilo}
                  onClick={() => escolherEstilo(alt.estilo)}
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

  if (resultado && tamanho) {
    const nomeEstilo = nomeDoEstilo(resultado);
    const imagemUrl = catalogo[tamanho]?.[resultado];
    const tamanhoInfo = TAMANHOS.find((t) => t.id === tamanho);
    const mensagem = encodeURIComponent(
      `Olá! Fiz o briefing de estilo com o(a) ${parceiro.nome} e meu resultado foi "${nomeEstilo}". ` +
        `Meu apê é ${tamanhoInfo?.nome.toLowerCase()} (${tamanhoInfo?.faixa}) e quero decorar: ${comodos.join(", ")}. ` +
        `Quero saber mais sobre a consultoria completa!`
    );
    const linkWhatsapp = parceiro.whatsapp
      ? `https://wa.me/${parceiro.whatsapp.replace(/\D/g, "")}?text=${mensagem}`
      : undefined;

    return (
      <div key="resultado" className="animate-fade-up flex flex-1 flex-col items-center px-6 py-16 sm:py-20 text-center">
        <p className="label-caps text-olive mb-4">Seu resultado</p>
        <h1 className="font-serif-display text-3xl sm:text-5xl leading-tight max-w-2xl text-charcoal mb-3">
          Baseado no que você respondeu, seu ambiente pode ficar assim
        </h1>
        <p className="label-caps text-terracotta mb-10">{nomeEstilo}</p>

        {imagemUrl && (
          <div className="relative w-full max-w-3xl aspect-[16/10] overflow-hidden rounded-sm border border-line">
            <Image
              src={imagemUrl}
              alt={`Ambiente decorado, estilo: ${nomeEstilo}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <p className="mt-8 max-w-xl text-sm sm:text-base text-charcoal/70">
          Essa é uma referência para o seu estilo: {nomeEstilo}. A
          personalização de verdade (móveis, medidas do seu espaço) acontece
          na consultoria.
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
          Refazer o briefing
        </button>
      </div>
    );
  }

  return null;
}
