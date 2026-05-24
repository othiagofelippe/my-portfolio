# Requirements — tfds Button Integration

## Overview

Substituição do `Button` local (`src/components/atoms/Button/Button.tsx`) pelo `Button` do `@tfds/components`. Inclui instalação dos pacotes, configuração do CSS/Tailwind e atualização de todos os usos no projeto.

## Escopo

- **Inclui:** instalação de `@tfds/tokens` e `@tfds/components`, configuração do `globals.css`, substituição do componente Button, atualização de todos os arquivos que o usam
- **Não inclui:** outros componentes (Badge, Input, etc.) — cada um terá sua própria branch e spec

## Functional Requirements

### FR-01: Instalação dos pacotes

- `@tfds/tokens` e `@tfds/components` DEVEM ser instalados via `file:` reference apontando para o monorepo local
- O `package.json` DEVE registrar ambas as dependências

### FR-02: Setup de CSS e Tailwind

- O `src/app/globals.css` DEVE importar `@tfds/tokens/css` (CSS variables `--tfds-*`)
- O `src/app/globals.css` DEVE importar `@tfds/tokens/tailwind` (bloco `@theme` com utilitários do DS)
- As imports do tf.ds NÃO DEVEM conflitar com o `@theme` existente do portfolio (nomes são distintos — verificado)
- Os custom variants `.dark` e `.ocean-sunset` existentes DEVEM ser mantidos

### FR-03: Substituição do componente

- O arquivo `src/components/atoms/Button/Button.tsx` DEVE ser substituído por um re-export do `@tfds/components`
- O `index.ts` do Button DEVE continuar exportando `Button` e `ButtonProps` com o mesmo caminho de import
- A prop `asChild` NÃO será suportada — ver seção de gaps

### FR-04: Mapeamento de variantes e tamanhos

| Portfolio (atual) | tf.ds | Ação |
|-------------------|-------|------|
| `variant="default"` | `variant="primary"` | Renomear |
| `variant="outline"` | `variant="outline"` | Manter |
| `variant="ghost"` | `variant="ghost"` | Manter |
| `size="default"` | `size="md"` | Renomear |
| `size="sm"` | `size="sm"` | Manter |
| `size="lg"` | `size="lg"` | Manter |
| `size="icon"` | `size="icon"` | Manter |

### FR-05: Tratamento do `asChild`

O portfolio usa `asChild` em 7 ocorrências para envolver links (`<a>` ou `<Link>`). O tf.ds não suporta `asChild` por design. Cada caso DEVE ser resolvido substituindo `<Button asChild>` por um elemento `<a>` nativo com `className` direto, usando as classes do tf.ds Button quando aplicável.

Arquivos afetados:
- `Hero.tsx` — 3 botões com `asChild` (1 `outline`, 2 `ghost icon`)
- `Projects.tsx` — 3 botões com `asChild` (2 `outline sm`, 1 sem variante)
- `Footer.tsx` — 4 botões com `asChild` (`ghost icon`)
- `Header.tsx` — 2 botões com `asChild` (`ghost`)
- `Experience.tsx` — 1 botão com `asChild` (`size="lg"`)

### FR-06: Relatório de gaps

DEVE ser gerado um arquivo `docs/specs/tfds-button/gaps.md` documentando o que o tf.ds não suportou, para ser endereçado no DS.

## Acceptance Criteria

- Build (`npm run build`) sem erros após a substituição
- Nenhum erro de TypeScript (`npm run type-check`)
- Visualmente: botões de ação primária mantêm aparência coerente com o DS
- Nenhuma regressão de layout nas seções que usam Button
