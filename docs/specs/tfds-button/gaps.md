# Gaps Report — tfds Button Integration

**Data:** 2026-05-17  
**Integração:** `@tfds/components@0.0.1` no `my-portfolio`  
**Status da migração:** Setup e substituição concluídos. Stories pendentes de atualização.

---

## Resumo

A integração do `Button` do tf.ds no my-portfolio expôs **4 gaps reais** entre o que o portfolio precisava e o que o tf.ds entrega hoje. Nenhum gap bloqueou a migração — todos foram contornados no consumidor — mas cada um representa uma decisão de design que vale registrar.

---

## Gap 1 — Sem suporte a `asChild` (sem renderização polimórfica)

**O que o portfolio precisava:**  
`<Button asChild><a href="...">texto</a></Button>` — renderizar o botão como elemento `<a>` mantendo estilo de botão.

**O que o tf.ds entrega:**  
Button sempre renderiza como `<button>`. Sem `asChild`, sem `as`, sem renderização polimórfica. Decisão intencional — componente opinionado.

**Impacto:**  
13 ocorrências de `asChild` em 5 arquivos precisaram ser reescritas:
- Links externos → `onClick` com `window.open`
- Download de CV → `onClick` com criação programática de `<a>` temporário
- Nav interna → `onClick` com `scrollToSection` (já existia, remoção limpa)

**Avaliação:**  
A restrição é válida para um DS opinionado. O padrão `window.open` funciona, mas perde o comportamento de right-click ("abrir em nova aba") que `<a>` fornece nativamente. Para casos de link real, um componente `LinkButton` no tf.ds resolveria sem abrir o polimorfismo.

**Sugestão para o tf.ds:**  
Avaliar um componente `LinkButton` com prop `href` — não `asChild`, mas uma variante semântica que renderiza `<a>`.

---

## Gap 2 — Nomenclatura de variantes divergente

**O que o portfolio usava:**  
`variant="default"` (primário visual)

**O que o tf.ds entrega:**  
`variant="primary"` — sem alias `default`.

**Impacto:**  
Erros de TypeScript em 6 pontos nas stories. Os componentes de produção não usavam `variant="default"` explicitamente (usavam o defaultVariant), então o impacto real foi só nas stories.

**Avaliação:**  
Naming `primary` é mais semântico e alinhado com o restante dos sistemas (Radix, shadcn também migraram para isso). Custo baixo de adaptação.

---

## Gap 3 — Nomenclatura de tamanhos divergente

**O que o portfolio usava:**  
`size="default"` (tamanho médio padrão)

**O que o tf.ds entrega:**  
`size="md"` — sem alias `default`.

**Impacto:**  
Erros de TypeScript em 3 pontos nas stories. Sem impacto nos componentes de produção.

**Avaliação:**  
`md` é mais explícito que `default`. Baixo custo de adaptação.

---

## Gap 4 — Ausência de variante `secondary`

**O que o portfolio precisava:**  
Não usava explicitamente, mas o portfolio tem uma variante de botão que é "fundo colorido leve com texto da cor da marca" — algo entre `primary` e `outline`.

**O que o tf.ds entrega:**  
`secondary` existe no tipo (`variant="secondary"`), mas o comportamento visual não foi validado no contexto do my-portfolio porque os tokens `--tfds-*` usam OKLCH e o portfolio usa `--color-*` em hex. Os estilos do Button tf.ds não se aplicam às variáveis do portfolio.

**Impacto:**  
O Button tf.ds renderiza com as cores dos tokens `--tfds-*`, não com as cores visuais do portfolio (`--color-accent-brand`, `--color-background-*`). Visualmente, o botão aparece com o tema light do tf.ds, não com o tema do portfolio.

**Avaliação:**  
Este é o gap mais crítico para adoção visual. O tf.ds e o portfolio são dois sistemas de tokens independentes. A integração funciona a nível de TypeScript e API, mas não a nível visual sem uma das duas abordagens:
- Mapear os tokens tf.ds (`--tfds-color-action-primary`) para os valores do portfolio no `globals.css`
- Ou migrar o portfolio para usar os tokens tf.ds como sistema de design principal

---

## Gap 5 — CSS import incompatível com Turbopack via symlink

**O que aconteceu:**  
`@import "@tfds/tokens/css"` em `globals.css` falhou no Turbopack com `FileSystemPath leaves the filesystem root` porque o pacote é instalado como symlink (`file:`) apontando para fora do root do projeto.

**Solução aplicada:**  
Adicionado `outputFileTracingRoot` e `transpilePackages` no `next.config.ts`:
```ts
outputFileTracingRoot: path.join(__dirname, "../../"),
transpilePackages: ["@tfds/tokens", "@tfds/components"],
```

**Avaliação:**  
Isso é um problema de DX para consumidores do tf.ds via `file:` reference em desenvolvimento local. Não afeta produção com pacotes publicados no npm. Pode ser documentado como nota de setup no README do tf.ds.

---

## Resumo executivo

| Gap | Severidade | Bloqueou migração? | Ação necessária no tf.ds |
|-----|------------|-------------------|--------------------------|
| Sem `asChild` / renderização polimórfica | Médio | Não | Avaliar `LinkButton` |
| `variant="default"` vs `"primary"` | Baixo | Não | Documentar breaking change |
| `size="default"` vs `"md"` | Baixo | Não | Documentar breaking change |
| Tokens visuais isolados (`--tfds-*` vs `--color-*`) | Alto | Não (funcional, não visual) | Estratégia de adoção de tokens |
| Turbopack + symlink CSS import | Médio (DX) | Não (contornado) | Documentar no README |

---

## Pendências da migração

- [ ] Atualizar `Button.stories.tsx` para usar `variant="primary"` e `size="md"` (erros de TypeScript ativos)
- [ ] Validar visualmente os temas light, dark, ocean-sunset com o Button tf.ds
- [ ] Decidir estratégia de tokens: manter sistemas paralelos ou migrar portfolio para `--tfds-*`
