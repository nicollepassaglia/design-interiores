# Casa Possível — Briefing de Estilo

Primeiro módulo do Casa Possível para a Nina Interiores: uma pessoa responde
um briefing rápido (tamanho do apê, cômodos a decorar, e um quiz de estilo) e
recebe uma imagem de referência de como um ambiente no estilo identificado
pode ficar. O objetivo é gerar desejo e captar um lead qualificado (estilo +
metragem + cômodos já registrados) para a consultoria completa.

Os estilos são baseados no **Guia de Decoração ArqExpress**. As imagens não
são da planta específica de quem responde — são renders de referência por
**estilo × tamanho de apartamento** (pequeno até 70m², médio 70–110m², grande
acima de 110m²), cadastrados uma vez no admin e reaproveitados por todos os
parceiros.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **Prisma 6** + **SQLite** (arquivo local `prisma/dev.db`) — fácil de trocar
  para Postgres em produção
- Upload de imagens local (`public/uploads`) via Server Actions

## Rodando localmente

```bash
npm install
cp .env.example .env   # ajuste ADMIN_PASSWORD e ADMIN_SESSION_SECRET
npx prisma migrate dev
npm run dev
```

- Briefing de exemplo: `http://localhost:3000/teste`
- Admin: `http://localhost:3000/admin` (senha em `ADMIN_PASSWORD`)

## Estrutura

- `src/lib/estilos.ts` — os estilos ativos (hoje: Clássico, Industrial,
  Rústico, Romântico, Contemporâneo). Adicionar um novo estilo é só
  acrescentar um item aqui — sem migração de banco.
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
estilo × tamanho (hoje, 5 estilos × 3 tamanhos = 15 combinações possíveis).
Não precisa preencher tudo de uma vez — combinações vazias usam
automaticamente outro tamanho já cadastrado daquele estilo.

## Deploy em produção

Recomendado: [Vercel](https://vercel.com).

1. Trocar o banco para Postgres (ex: Vercel Postgres ou Neon): atualizar
   `datasource db { provider = "postgresql" }` em `prisma/schema.prisma` e
   rodar `npx prisma migrate deploy`.
2. Trocar o armazenamento de imagens de `public/uploads` (disco local, não
   persiste em serverless) para um serviço como Vercel Blob ou S3 — ajustar
   `src/lib/upload.ts`.
3. Configurar as variáveis de ambiente (`DATABASE_URL`, `ADMIN_PASSWORD`,
   `ADMIN_SESSION_SECRET`) no painel da Vercel.

## Fora de escopo (por enquanto)

- Pagamento/checkout
- Módulo de vídeo "antes e depois"
- Geração de imagem por IA em tempo real — imagens são pré-renderizadas e
  cadastradas manualmente no admin
- Renders específicos por planta/empreendimento (descartado — ver
  `docs/spec.md` para o desenho original e o motivo da mudança)
