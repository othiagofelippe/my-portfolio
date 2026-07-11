# Design — tfds Button Integration

## 1. Instalação

```bash
npm install file:../../tf.ds/packages/tokens file:../../tf.ds/packages/components
```

> Paths relativos de `my-portfolio/` para `tf.ds/packages/`.

## 2. `src/app/globals.css` — adicionar imports

```css
/* No topo, após @import "tailwindcss" */
@import "@tfds/tokens/css";
@import "@tfds/tokens/tailwind";
```

O `@tfds/tokens/css` define as CSS vars `--tfds-*` (primitivos + 3 temas).
O `@tfds/tokens/tailwind` expõe o `@theme {}` com os utilitários (`bg-action-primary`, `text-text-primary`, etc.).

**Sem conflitos com o `@theme` existente** — os nomes do tf.ds (`--color-action-primary`, `--color-text-primary`) não colidem com os do portfolio (`--color-accent-brand`, `--color-text-headline`).

## 3. `src/components/atoms/Button/Button.tsx` — re-export

```tsx
export { Button, type ButtonProps } from "@tfds/components"
```

Remove toda a implementação local (CVA, Radix Slot, `cn()`). O `index.ts` permanece igual.

## 4. Tratamento do `asChild`

Para cada `<Button asChild>` que envolve um link, substituir por `<a>` nativo. Exemplos:

**Antes:**
```tsx
<Button asChild variant="outline" size="lg">
  <a href="/cv">Download CV</a>
</Button>
```

**Depois:**
```tsx
<a href="/cv" className="...classes equivalentes ao outline lg...">
  Download CV
</a>
```

Alternativa mais limpa para links de navegação: usar `variant="ghost"` sem `asChild` e controlar o comportamento via `onClick` + `router.push()`.

## 5. Arquivos a modificar

| Arquivo | Mudança |
|---------|---------|
| `package.json` | Adicionar `@tfds/tokens` e `@tfds/components` |
| `src/app/globals.css` | Adicionar 2 imports do tf.ds |
| `src/components/atoms/Button/Button.tsx` | Substituir por re-export |
| `src/components/sections/Hero.tsx` | Remover `asChild`, ajustar variantes |
| `src/components/sections/Projects.tsx` | Remover `asChild`, ajustar variantes |
| `src/components/sections/Experience.tsx` | Remover `asChild`, ajustar variante |
| `src/components/organisms/Header/Header.tsx` | Remover `asChild` |
| `src/components/organisms/Footer/Footer.tsx` | Remover `asChild` |
| `src/components/organisms/Carousel/Carousel.tsx` | Verificar variantes passadas via props |
