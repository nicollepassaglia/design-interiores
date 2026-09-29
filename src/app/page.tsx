export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="label-caps text-olive mb-6">Casa Possível</p>
      <h1 className="font-serif-display text-3xl sm:text-5xl leading-tight max-w-xl text-charcoal">
        Briefing de Estilo
      </h1>
      <p className="mt-6 max-w-md text-base text-charcoal/70">
        Este briefing é acessado por um link específico, compartilhado pela
        construtora, imobiliária ou corretor parceiro.
      </p>
    </div>
  );
}
