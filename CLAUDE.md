# Portfolio — Contexto do Projeto

Portfolio pessoal de Thiago Felippe. Repaginada visual completa (estrutura/estética do protótipo Figma Make, vestida com a identidade `@tfds`) concluída em `develop`; ver `docs/REDESIGN_SPEC.md` para o histórico completo da spec e do plano de execução (T0–T8).

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript strict + Tailwind CSS v4 + Turbopack
- **Design system externo `@tfds`**: `@tfds/components`, `@tfds/tokens`, `@tfds/icons` via `file:../tf.ds/packages/*` (repo irmão). Componentes de UI (Button, Badge, Typography, VStack...) vêm de lá — NÃO criar equivalentes locais
- Animações: Motion (`motion/react`) — exige `'use client'`; `prefers-reduced-motion` respeitado globalmente via `MotionConfig reducedMotion="user"` em `app/[lang]/layout.tsx`
- Temas: next-themes com 3 temas — light (default), `.dark`, `.ocean-sunset`
- i18n: rotas `app/[lang]` (pt/en/es) + dicionários em `src/dictionaries/*.json`; anchors/ids de seção sempre em inglês (`#about`, `#experience`, `#projects`, `#skills`, `#contact`)
- Sons: `use-sound` via `src/context/AudioContext.tsx`
- Deploy alvo: Vercel + Vercel Analytics

## Estrutura real

```
src/
├── app/
│   └── [lang]/
│       ├── page.tsx           # home: Hero → About → Experience → Projects → Skills → Blog → Contact
│       ├── blog/page.tsx      # listagem de posts
│       ├── blog/[slug]/page.tsx  # post individual (generateStaticParams + notFound())
│       └── layout.tsx, opengraph-image.tsx
├── app/globals.css        # mapeia tokens --tfds-* para classes Tailwind + tema ocean-sunset
├── app/providers/ThemeProvider.tsx
├── components/
│   ├── atoms|molecules|organisms/  # composições locais (Logo, Card, Header, Footer...)
│   └── sections/           # cada seção em pasta própria (index.ts, types.ts, constants.ts) — padrão: Hero/, About/, Blog/
├── data/                   # projects.ts e posts.ts (curadoria local, sem CMS/API)
├── context/AudioContext.tsx
├── dictionaries/{pt,en,es}.json
├── hooks/useActiveSection.ts
└── lib/                    # i18n, dictionaries, metadata, structured-data, motion.ts, utils (cn, getCVFileName, formatPostDate)
```

Não existe mais `src/app/api/github/` (Projects passou a ser Server Component com dados locais) nem `Education.tsx`/`Services.tsx` (Formação/Certificação foram absorvidas por Experience; Services nunca era renderizado).

## Design tokens

- Fonte da verdade: `@tfds/tokens` (importado em `globals.css` via `@import "@tfds/tokens/css"`)
- Usar classes Tailwind mapeadas: `bg-bg-page`, `bg-bg-default`, `text-text-primary`, `text-action-primary`, `border-border-default`, `text-feedback-error` etc. (lista completa no `@theme inline` de `src/app/globals.css`)
- Nunca hex/valores mágicos; tema `ocean-sunset` sobrescreve os `--tfds-*` em `globals.css`
- Fontes: Roboto (sans) e Poppins (display) via `next/font`, ligadas aos tokens do DS
- `Typography` só aceita `color`: `primary | secondary | disabled | onBrand | error | success | warning` — não existe variante `tertiary`; para texto terciário use `className="text-text-tertiary"` diretamente

## Convenções

- Function declarations, named exports, props em `interface` separada (padrão: `src/components/sections/Hero/types.ts`)
- Nunca `any`, nunca `!`, nunca `key={index}`, nunca `href="#"` (link real ou não existe)
- Server Components por padrão; `'use client'` só para hooks/Motion/áudio (Hero, About, Experience, Skills, Contact e o Header são client por causa do Motion; Projects e Blog são Server Components)
- Toda seção nova ou refatorada segue o padrão pasta (`NomeDaSecao/` com `index.ts`, `types.ts`, `constants.ts`)
- A11y WCAG 2.1 AA: HTML semântico, aria-labels, teclado, contraste nos 3 temas, `prefers-reduced-motion` em animações
- Commits: Conventional Commits (commitlint via Husky); lint roda no pre-commit

## Scripts

`npm run dev | build | lint | format | format:check | type-check` — não há script de teste ainda (Vitest instalado, sem config).

⚠️ Se `NODE_ENV=development` estiver setado globalmente no shell (ex.: `.zshrc`), `next build` quebra na geração do `/404` interno (`<Html> should not be imported outside of pages/_document.`). Rode `build`/`lint`/`type-check` com `NODE_ENV=production` explícito até isso ser corrigido na raiz do shell.

## Workflow Claude Code

- Hooks ativos (`.claude/settings.json`): Prettier automático pós Write/Edit; type-check + build antes de `git push`; `.env*` bloqueado
- Commands do projeto: `/spec`, `/plan`, `/debug`, `/commit-message`, `/pr-description`, `/ship`, `/test-writer`, `/refactor-guide`
- Agents (`.claude/agents/`): code-reviewer, test-engineer, accessibility-auditor, performance-optimizer, documentation-writer

## Estado atual e débitos conhecidos

- Repaginada visual (T0–T8 da `docs/REDESIGN_SPEC.md`) concluída em `develop`: git limpo (só `main`/`develop` local), zero `any`/`key={index}`, `prefers-reduced-motion` global, Projects/Blog como Server Components, Hero sem foto, About nova, Education absorvida por Experience, Skills com dots de token + idiomas, Contact em card único, Blog com dados locais
- Bloqueante para deploy real (fora do escopo da spec): dependência `@tfds/*` via `file:../tf.ds/packages/*` não tem estratégia de build coberta pela Vercel — precisa de tarefa separada antes de publicar
- First Load JS de `/[lang]` está em ~224kB (meta do roadmap é <100kB) — não resolvido nesta repaginada
- Zero testes (Vitest instalado, sem config) — fora do escopo da spec
- Blog em produção com apenas 1 post placeholder — trocar por conteúdo real antes de divulgar o site

**Última atualização:** 2026-07-11
