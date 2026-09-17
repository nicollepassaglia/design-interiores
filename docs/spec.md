# Sistema Pocket — Módulo 1: Quiz de Estilo

## Contexto e objetivo

Este é o primeiro módulo de um sistema maior (Sistema Pocket) para o escritório de design de interiores Nina Interiores, em parceria com o escritório de arquitetura do Kako (Piracicaba/SP).

O objetivo deste módulo é: um morador (que está alugando ou comprou um apartamento de um empreendimento parceiro) responde um quiz curto de estilo de decoração e recebe, como resultado, uma imagem renderizada mostrando como o apartamento **dele especificamente** (a planta do prédio onde ele mora) poderia ficar decorado no estilo identificado. O objetivo de negócio é gerar desejo e converter esse morador em um lead que entra em contato para contratar a consultoria completa (o "pocket": moodboard físico + especificação de peças compráveis).

Canal de distribuição: **B2B** — a ferramenta é oferecida a construtoras, imobiliárias e corretores, que compartilham o link com os moradores/compradores dos seus empreendimentos.

## Fluxo do usuário

1. Morador acessa o link (compartilhado pela construtora, imobiliária ou corretor parceiro).
2. Responde as 7 perguntas do quiz de estilo (ver seção "Perguntas do quiz").
3. O sistema soma os pontos de cada resposta, por estilo.
4. O sistema identifica o estilo com maior pontuação (ver "Regra de pontuação e desempate").
5. O sistema busca, no banco de imagens, a versão da **planta específica daquele empreendimento** já renderizada nesse estilo vencedor.
6. Mostra a tela de resultado: a imagem renderizada + a mensagem "Baseado no que você respondeu, seu apê pode ficar assim".
7. Exibe um CTA de contato: "Gostou? Fale com a gente para ver mais opções e receber seu moodboard completo."

## Telas necessárias

- **Landing/abertura do quiz**: breve texto de boas-vindas + botão "Começar".
- **Quiz**: 7 perguntas, uma por tela (ou em sequência com barra de progresso), múltipla escolha com 4 alternativas cada.
- **Resultado**: imagem renderizada do estilo vencedor para a planta do empreendimento em questão + texto + botão de CTA (contato via WhatsApp ou formulário).
- **Admin/cadastro** (uso interno, não do morador): tela simples para cadastrar um novo empreendimento/planta e fazer upload das imagens correspondentes a cada um dos 4 estilos (ver "Estrutura de dados").

## Os 4 estilos

Categorias usadas tanto para as 4 versões renderizadas de cada planta quanto para a pontuação do quiz. (Proposta de partida — pode ser ajustada.)

| Estilo | Descrição |
|---|---|
| **Quente Orgânico** | Terracota, tons terrosos, muxarabi, plantas, madeira natural. Referência: "México dos anos 1940". |
| **Boho Tropical** | Mais cor e estampa: rattan, vime, tecidos estampados, mistura cultural, clima despojado e alegre. |
| **Rústico Aconchegante** | Madeira crua, linho, tons neutros quentes, texturas naturais. Clima "casa de vó atualizada". |
| **Contemporâneo Vibrante** | Formas orgânicas mais atuais, uma cor de destaque forte, linhas mais limpas — ainda quente, porém mais gráfico. |

## Estrutura de dados

Cada planta/empreendimento cadastrado precisa destes campos (pode começar como planilha e ser importado, não precisa ser banco relacional desde o dia 1):

| Campo | Tipo | Descrição |
|---|---|---|
| `id_planta` | texto (único) | Identificador único, ex.: nome do prédio + tipo de unidade |
| `nome_empreendimento` | texto | Nome do prédio/condomínio, exibido no resultado |
| `imagem_quente_organico` | URL da imagem | Render da planta no estilo Quente Orgânico |
| `imagem_boho_tropical` | URL da imagem | Render da planta no estilo Boho Tropical |
| `imagem_rustico_aconchegante` | URL da imagem | Render da planta no estilo Rústico Aconchegante |
| `imagem_contemporaneo_vibrante` | URL da imagem | Render da planta no estilo Contemporâneo Vibrante |
| `imagem_planta_crua` | URL da imagem (opcional) | Foto/render "antes", sem decoração — usada também pelo módulo futuro de vídeo de transformação |

## Perguntas do quiz

Cada alternativa soma pontos para um dos 4 estilos. Perguntas 1–6 valem **1 ponto**; a pergunta 7 (visual) vale **2 pontos** e funciona como desempate.

**1. Qual paleta de cores te atrai mais?**
- Terracota, terroso, verde-folha → *Quente Orgânico*
- Amarelo, turquesa, rosa vibrante, estampas → *Boho Tropical*
- Bege, cru, marrom claro, branco quente → *Rústico Aconchegante*
- Neutro + uma cor de destaque forte (mostarda, vinho) → *Contemporâneo Vibrante*

**2. Qual frase mais combina com o clima que você quer em casa?**
- "Quero me sentir em férias, num lugar quente" → *Quente Orgânico*
- "Quero alegria e uma pitada de bagunça boa" → *Boho Tropical*
- "Quero aconchego, tipo abraço" → *Rústico Aconchegante*
- "Quero um lugar com cara de revista de decoração atual" → *Contemporâneo Vibrante*

**3. Qual material você escolheria sem pensar duas vezes?**
- Palha, fibras naturais, muxarabi → *Quente Orgânico*
- Rattan, vime, tecido estampado → *Boho Tropical*
- Madeira crua, linho, lã → *Rústico Aconchegante*
- Metal fosco, vidro, madeira escura → *Contemporâneo Vibrante*

**4. Como você imagina usar mais o espaço no dia a dia?**
- Um cantinho para ler e desacelerar → *Quente Orgânico*
- Receber amigos e criar memória → *Boho Tropical*
- Descansar depois de um dia corrido, sem estímulo demais → *Rústico Aconchegante*
- Viver num lugar com a cara de agora → *Contemporâneo Vibrante*

**5. Estampas e padronagens: até onde você vai?**
- Discreta, mais textura do que estampa → *Quente Orgânico*
- Quanto mais estampa, melhor → *Boho Tropical*
- Prefiro liso, com textura no tecido → *Rústico Aconchegante*
- Só uma estampa geométrica de impacto, o resto liso → *Contemporâneo Vibrante*

**6. Se o seu espaço fosse um lugar do mundo, qual seria?**
- Uma casa de campo no México → *Quente Orgânico*
- Uma praia colorida no Nordeste → *Boho Tropical*
- Uma cabana no interior → *Rústico Aconchegante*
- Um apartamento novo numa capital → *Contemporâneo Vibrante*

**7. [Pergunta visual — vale 2 pontos] Olhe as 4 imagens abaixo e escolha a que mais te dá vontade de morar.**
- Usar as próprias 4 imagens-modelo já renderizadas (uma por estilo) como as opções desta pergunta. Cada imagem vale 2 pontos para o estilo que representa.

## Regra de pontuação e desempate

Somar os pontos das 7 respostas por estilo. O estilo com mais pontos é o resultado exibido ao usuário. Em caso de empate, o estilo escolhido na pergunta 7 (visual) prevalece, por ser o sinal de preferência mais direto.

## Copy da tela de resultado

> **Baseado no que você respondeu, seu apê pode ficar assim:**
> [imagem renderizada da planta no estilo vencedor]
> Esse é só um dos caminhos possíveis para o seu estilo. Quer ver mais opções e receber seu moodboard completo com as peças?
> **[Botão: Quero minha consultoria]**

**Importante — cuidado de expectativa**: como existem apenas 4 variações fixas por planta (não uma combinação infinita e personalizada), o texto não deve prometer "isso é exatamente o seu apartamento com a sua mobília" — e sim que o apartamento **combina** com aquele estilo. A personalização de verdade (móveis, medidas da unidade específica) acontece depois do contato.

## Fora de escopo neste módulo

- Pagamento/checkout (a definir em etapa comercial separada).
- Módulo de vídeo de transformação "antes e depois" (módulo 2, ainda em especificação).
- Geração de imagem por IA em tempo real — as imagens são pré-renderizadas manualmente pela equipe (SketchUp + Magnific) e cadastradas no admin, não geradas on-demand pelo app.
