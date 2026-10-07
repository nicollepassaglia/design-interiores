# Casa Possível — Briefing de Estilo

Primeiro módulo do Casa Possível para a Nina Interiores: uma pessoa responde
um briefing rápido (tamanho do apê, cômodos a decorar, e um quiz de estilo) e
recebe uma imagem de referência de como um ambiente no estilo identificado
pode ficar. O objetivo é gerar desejo e captar um lead qualificado (estilo +
metragem + cômodos já registrados) para a consultoria completa.

Os 4 estilos oficiais são Brasileira, Natural, Contemporâneo e Industrial
(definidos no documento de contexto da parceria). As imagens não
são da planta específica de quem responde — são renders de referência por
**estilo × tamanho de apartamento** (pequeno até 70m², médio 70–110m², grande
acima de 110m²), cadastrados uma vez no admin e reaproveitados por todos os
parceiros.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **Prisma 6** + **Postgres** (Neon, via Vercel)
- Upload de imagens no **Vercel Blob** em produção (sem token, cai para
  `public/uploads` no dev local), via Server Actions

## Rodando localmente

```bash
npm install
cp .env.example .env   # preencha DATABASE_URL(_UNPOOLED) com um Postgres (ex: Neon) e as senhas
npx prisma migrate dev
npm run dev
```

- Briefing de exemplo: `http://localhost:3000/teste`
- Admin: `http://localhost:3000/admin` (senha em `ADMIN_PASSWORD`)

## Estrutura

- `src/lib/estilos.ts` — os estilos ativos (hoje: Brasileira, Natural,
  Contemporâneo, Industrial). Adicionar um novo estilo é acrescentar um item
  aqui e uma alternativa em cada pergunta — sem migração de banco.
- `src/lib/tamanhos.ts` — as 3 faixas de tamanho e a lista de cômodos
- `src/lib/perguntas.ts` — as perguntas de briefing de estilo (pontuadas)
- `src/lib/pontuacao.ts` — regra de pontuação e desempate
- `src/lib/renders.ts` — busca o render de (estilo, tamanho) com fallback
  para qualquer tamanho daquele estilo, caso o catálogo ainda esteja
  incompleto
- `src/components/quiz/QuizFlow.tsx` — fluxo completo: landing → tamanho →
  quantidade de cômodos → quais cômodos → quiz de estilo → resultado
- `src/app/[parceiro]/page.tsx` — página pública do briefing por parceiro
- `src/app/admin/` — cadastro de parceiros (link + WhatsApp) e do catálogo
  de renders (protegido por senha)

## Cadastrando no admin

**Parceiros** (`/admin`): cada construtora/imobiliária/corretor tem um slug
próprio (vira a URL `/slug-do-parceiro` compartilhada com o lead) e um
WhatsApp — usado só para atribuição do lead e o botão de contato, não afeta
as imagens mostradas.

**Catálogo de renders** (`/admin/renders`): uma imagem por combinação de
estilo × tamanho (hoje, 4 estilos × 3 tamanhos = 12 combinações possíveis).
Não precisa preencher tudo de uma vez — combinações vazias usam
automaticamente outro tamanho já cadastrado daquele estilo.

## Deploy em produção

Recomendado: [Vercel](https://vercel.com).

1. Importar o repositório na Vercel (New Project).
2. Na aba Storage do projeto, criar um **Neon Postgres** (preenche
   `DATABASE_URL` e `DATABASE_URL_UNPOOLED` sozinho) e um **Blob Store**
   (preenche `BLOB_READ_WRITE_TOKEN`).
3. Em Settings > Environment Variables, adicionar `ADMIN_PASSWORD` e
   `ADMIN_SESSION_SECRET`.
4. Deploy. O build já roda `prisma migrate deploy` e cria as tabelas.
5. Entrar em `/admin`, cadastrar o primeiro parceiro e subir os renders.

## Fora de escopo (por enquanto)

- Pagamento/checkout
- Módulo de vídeo "antes e depois"
- Geração de imagem por IA em tempo real — imagens são pré-renderizadas e
  cadastradas manualmente no admin
- Renders específicos por planta/empreendimento (descartado — ver
  `docs/spec.md` para o desenho original e o motivo da mudança)
