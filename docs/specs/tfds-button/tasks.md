# Tasks — tfds Button Integration

## Status: 🔴 Não iniciado

---

## 1. Setup

- [ ] Instalar `@tfds/tokens` e `@tfds/components` via `file:` reference
- [ ] Adicionar imports do tf.ds no `src/app/globals.css`
- [ ] Confirmar que `npm run dev` inicia sem erros

## 2. Substituição do componente

- [ ] Substituir `src/components/atoms/Button/Button.tsx` por re-export do `@tfds/components`
- [ ] Confirmar que `index.ts` continua exportando `Button` e `ButtonProps`
- [ ] Confirmar que TypeScript não reporta erros no componente

## 3. Atualização dos usos

- [ ] `Hero.tsx` — remover `asChild`, resolver 3 casos de link
- [ ] `Projects.tsx` — remover `asChild`, resolver 3 casos de link
- [ ] `Experience.tsx` — remover `asChild`, resolver 1 caso de link
- [ ] `Header.tsx` — remover `asChild`, resolver 2 casos
- [ ] `Footer.tsx` — remover `asChild`, resolver 4 casos de link
- [ ] `Carousel.tsx` — verificar variantes passadas via props

## 4. Validação

- [ ] `npm run type-check` sem erros
- [ ] `npm run build` sem erros
- [ ] Inspecionar visualmente as seções: Hero, Projects, Experience, Header, Footer
- [ ] Verificar temas: light, dark, ocean-sunset

## 5. Relatório de gaps

- [ ] Gerar `docs/specs/tfds-button/gaps.md` com o que o tf.ds não suportou

---

## Progresso

```
1. Setup                  ░░░░░░░░░░   0%
2. Substituição           ░░░░░░░░░░   0%
3. Atualização dos usos   ░░░░░░░░░░   0%
4. Validação              ░░░░░░░░░░   0%
5. Relatório de gaps      ░░░░░░░░░░   0%
```
