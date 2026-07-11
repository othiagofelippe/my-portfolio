# AGENTS.md — my-portfolio

Arquivo de orientação para agentes da mini-org. Leia este arquivo primeiro, depois o `CLAUDE.md`.

## Antes de começar

1. Leia o `CLAUDE.md` deste repositório — contém stack, arquitetura, padrões e regras
2. Antes de sugerir cores ou espaçamentos, leia `src/app/globals.css`

## Convenções da org neste projeto

- **Prefixo de task:** `PORT-` (ex: `PORT-001`, `PORT-002`)
- **Pasta de tasks:** `tasks/` (raiz do repositório)
- **Template de task:** veja `tasks/README.md`

## Regras críticas (resumo do CLAUDE.md)

- Conteúdo direto e humano — sem jargão de IA, sem buzzwords
- Server Components por padrão — `'use client'` só quando estritamente necessário
- Design tokens semânticos sempre — nunca cores hardcoded
- Todo item clicável é `<button>` ou `<a>`, nunca `<div onClick>`
- WCAG 2.1 AA em tudo

Para a regra completa de cada item, leia `CLAUDE.md`.
