import Image from "next/image";
import { ESTILO_INFO } from "@/lib/estilos";

type CampoImagem = {
  nome: string;
  label: string;
  atual?: string | null;
  obrigatorio?: boolean;
};

export function EmpreendimentoForm({
  action,
  valoresIniciais,
  modo,
}: {
  action: (formData: FormData) => void;
  valoresIniciais?: {
    idPlanta: string;
    nomeEmpreendimento: string;
    whatsapp: string | null;
    imagemQuenteOrganico: string;
    imagemBohoTropical: string;
    imagemRusticoAconchegante: string;
    imagemContemporaneoVibrante: string;
    imagemPlantaCrua: string | null;
  };
  modo: "criar" | "editar";
}) {
  const camposImagem: CampoImagem[] = [
    {
      nome: "imagemQuenteOrganico",
      label: ESTILO_INFO.quente_organico.nome,
      atual: valoresIniciais?.imagemQuenteOrganico,
      obrigatorio: true,
    },
    {
      nome: "imagemBohoTropical",
      label: ESTILO_INFO.boho_tropical.nome,
      atual: valoresIniciais?.imagemBohoTropical,
      obrigatorio: true,
    },
    {
      nome: "imagemRusticoAconchegante",
      label: ESTILO_INFO.rustico_aconchegante.nome,
      atual: valoresIniciais?.imagemRusticoAconchegante,
      obrigatorio: true,
    },
    {
      nome: "imagemContemporaneoVibrante",
      label: ESTILO_INFO.contemporaneo_vibrante.nome,
      atual: valoresIniciais?.imagemContemporaneoVibrante,
      obrigatorio: true,
    },
    {
      nome: "imagemPlantaCrua",
      label: "Planta crua (opcional, sem decoração)",
      atual: valoresIniciais?.imagemPlantaCrua,
    },
  ];

  return (
    <form action={action} className="flex flex-col gap-8 max-w-2xl">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="label-caps text-charcoal/60">
            ID da planta {modo === "editar" && "(fixo)"}
          </span>
          <input
            name="idPlanta"
            defaultValue={valoresIniciais?.idPlanta}
            disabled={modo === "editar"}
            placeholder="ex: edificio-aurora-planta-2q"
            required
            className="rounded-sm border border-line bg-paper px-5 py-4 text-charcoal outline-none focus:border-terracotta disabled:opacity-50"
          />
          <span className="text-xs text-charcoal/40">
            Usado na URL do quiz: /{valoresIniciais?.idPlanta ?? "id-da-planta"}
          </span>
        </label>

        <label className="flex flex-col gap-2">
          <span className="label-caps text-charcoal/60">Nome do empreendimento</span>
          <input
            name="nomeEmpreendimento"
            defaultValue={valoresIniciais?.nomeEmpreendimento}
            placeholder="ex: Edifício Aurora"
            required
            className="rounded-sm border border-line bg-paper px-5 py-4 text-charcoal outline-none focus:border-terracotta"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="label-caps text-charcoal/60">WhatsApp para contato (opcional)</span>
          <input
            name="whatsapp"
            defaultValue={valoresIniciais?.whatsapp ?? ""}
            placeholder="ex: 5519999999999"
            className="rounded-sm border border-line bg-paper px-5 py-4 text-charcoal outline-none focus:border-terracotta"
          />
        </label>
      </div>

      <div className="flex flex-col gap-5">
        <p className="label-caps text-olive">Imagens renderizadas por estilo</p>
        {camposImagem.map((campo) => (
          <label key={campo.nome} className="flex items-center gap-4">
            {campo.atual && (
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-sm border border-line">
                <Image src={campo.atual} alt={campo.label} fill className="object-cover" sizes="80px" />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-sm text-charcoal">{campo.label}</span>
              <input
                type="file"
                name={campo.nome}
                accept="image/*"
                required={campo.obrigatorio && modo === "criar"}
                className="text-sm text-charcoal/60 file:mr-4 file:rounded-full file:border-0 file:bg-sand file:px-4 file:py-2 file:text-xs file:tracking-wide file:cursor-pointer"
              />
            </div>
          </label>
        ))}
      </div>

      <button
        type="submit"
        className="self-start rounded-full bg-charcoal px-10 py-4 text-sm tracking-wide text-cream transition hover:bg-terracotta cursor-pointer"
      >
        {modo === "criar" ? "Cadastrar empreendimento" : "Salvar alterações"}
      </button>
    </form>
  );
}
