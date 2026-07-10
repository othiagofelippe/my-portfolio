# Portfolio — Contexto do Projeto

Portfolio pessoal de Thiago Felippe. Em migração para o design system próprio `@tfds` (branch `tfds/migration`); próxima fase: repaginada visual completa.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript strict + Tailwind CSS v4 + Turbopack
- **Design system externo `@tfds`**: `@tfds/components`, `@tfds/tokens`, `@tfds/icons` via `file:../tf.ds/packages/*` (repo irmão). Componentes de UI (Button, Badge, Typography, VStack...) vêm de lá — NÃO criar equivalentes locais
- Animações: Motion (`motion/react`) — exige `'use client'`
- Temas: next-themes com 3 temas — light (default), `.dark`, `.ocean-sunset`
- i18n: rotas `app/[lang]` (pt/en/es) + dicionários em `src/dictionaries/*.json`
- Sons: `use-sound` via `src/context/AudioContext.tsx`
- Deploy alvo: Vercel + Vercel Analytics

## Estrutura real

```
src/
├── app/
│   ├── [lang]/           # página única com seções; layout, og-image
│   ├── api/github/repos/ # route que alimenta a seção Projects
│   ├── globals.css       # mapeia tokens --tfds-* para classes Tailwind + tema ocean-sunset
│   └── providers/ThemeProvider.tsx
├── components/
│   ├── atoms|molecules|organisms/  # composições locais (Logo, Card, Header, Footer, Carousel...)
│   └── sections/         # Hero/ (padrão novo: pasta com types/constants) + demais em arquivo único
├── context/AudioContext.tsx
├── dictionaries/{pt,en,es}.json
├── hooks/useActiveSection.ts
└── lib/                  # i18n, dictionaries, metadata, structured-data, utils (cn, getCVFileName)
```

## Design tokens

- Fonte da verdade: `@tfds/tokens` (importado em `globals.css` via `@import "@tfds/tokens/css"`)
- Usar classes Tailwind mapeadas: `bg-bg-page`, `bg-bg-default`, `text-text-primary`, `text-action-primary`, `border-border-default`, `text-feedback-error` etc. (lista completa no `@theme inline` de `src/app/globals.css`)
- Nunca hex/valores mágicos; tema `ocean-sunset` sobrescreve os `--tfds-*` em `globals.css`
- Fontes: Roboto (sans) e Poppins (display) via `next/font`, ligadas aos tokens do DS

## Convenções

- Function declarations, named exports, props em `interface` separada (padrão: `src/components/sections/Hero/types.ts`)
- Nunca `any`, nunca `!`, nunca `key={index}`
- Server Components por padrão; `'use client'` só para hooks/Motion/áudio
- Seções novas ou refatoradas seguem o padrão pasta (`Hero/` com `index.ts`, `types.ts`, `constants.ts`)
- A11y WCAG 2.1 AA: HTML semântico, aria-labels, teclado, contraste nos 3 temas, `prefers-reduced-motion` em animações
- Commits: Conventional Commits (commitlint via Husky); lint roda no pre-commit

## Scripts

`npm run dev | build | lint | format | format:check | type-check` — não há script de teste ainda (Vitest instalado, sem config).

## Workflow Claude Code

- Hooks ativos (`.claude/settings.json`): Prettier automático pós Write/Edit; type-check + build antes de `git push`; `.env*` bloqueado
- Commands do projeto: `/spec`, `/plan`, `/debug`, `/commit-message`, `/pr-description`, `/ship`, `/test-writer`, `/refactor-guide`
- Agents (`.claude/agents/`): code-reviewer, test-engineer, accessibility-auditor, performance-optimizer, documentation-writer

## Estado atual e débitos conhecidos

- Branch `tfds/migration`: substituição de componentes locais pelo `@tfds` quase completa
- Débitos: `dict: any` em Projects/Services/Footer; seções client que poderiam ser server (Projects faz fetch em useEffect); `prefers-reduced-motion` não respeitado; dicionários com chaves mortas; `Services.tsx` não renderizado; zero testes
- Roadmap: repaginada visual completa, Projects com curadoria manual, testes, Lighthouse > 90 / First Load JS < 100kb

**Última atualização:** 2026-07-10
