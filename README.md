# Sistema Pocket — Quiz de Estilo

Primeiro módulo do Sistema Pocket para a Nina Interiores: um morador responde
um quiz de 7 perguntas e recebe uma imagem renderizada de como o apartamento
dele (a planta específica do empreendimento) pode ficar decorado no estilo
identificado.

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
npm run db:seed        # cria um empreendimento de exemplo com imagens placeholder
npm run dev
```

- Quiz de exemplo: `http://localhost:3000/edificio-aurora-2q`
- Admin: `http://localhost:3000/admin` (senha em `ADMIN_PASSWORD`)

## Estrutura

- `src/lib/perguntas.ts` — as 7 perguntas e alternativas do quiz
- `src/lib/pontuacao.ts` — regra de pontuação e desempate
- `src/lib/estilos.ts` — os 4 estilos e mapeamento para os campos de imagem
- `src/components/quiz/QuizFlow.tsx` — fluxo completo (landing → quiz → resultado)
- `src/app/[idPlanta]/page.tsx` — página pública do quiz por empreendimento
- `src/app/admin/` — cadastro de empreendimentos (protegido por senha)

## Cadastrando um empreendimento real

No admin, cada empreendimento precisa de:

- Um `ID da planta` único (vira a URL do quiz compartilhada com o morador)
- Nome do empreendimento
- WhatsApp para o botão de contato do resultado (opcional)
- As 4 imagens renderizadas (uma por estilo) — feitas pela equipe em
  SketchUp + Magnific, não geradas pelo sistema
- Imagem da planta crua (opcional, para o futuro módulo de vídeo)

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
