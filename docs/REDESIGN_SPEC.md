# Repaginada do Portfolio — Requisitos · Design · Plano

> Status: **aprovada** (2026-07-10). Documento autocontido para execução por qualquer LLM/dev.
> Referência visual: export do Figma Make em `~/Downloads/Portfolio for Frontend Developer/src/app/pages/Home.tsx` (usar estrutura e conteúdo; NÃO copiar código, cores nem fontes de lá).
> Ler o `CLAUDE.md` do projeto antes de começar.

---

## 1. Requisitos

### Objetivo

Repaginar o portfolio com a estrutura e estética do protótipo Figma Make (seções em eyebrow + display pesada, timeline de experiência, projetos numerados, stats, seção Sobre narrativa, blog), vestido com a identidade existente — tokens de cor do `@tfds` e fontes Roboto/Poppins — corrigindo os débitos técnicos no caminho, sobre uma base git limpa. Princípio: **o simples bem feito**.

### Escopo

**Entra:**

- Git cleanup: apenas `main` + `develop` ao final
- Débitos: seções client → Server Components onde possível; `dict` tipado (fim do `any`); keys semânticas; `prefers-reduced-motion`; remoção de `Services.tsx`, chaves mortas dos dicionários e deps mortas
- Repaginada: Hero, Sobre (nova), Experiência (timeline, absorve Formação), Projects (curadoria local, sem API), Skills, Contato
- Blog: lista + post, 1 placeholder, preview na home, link no header
- Conteúdo: novas descrições valorizando o trabalho (base: textos do protótipo)

**NÃO entra:** deploy/publicação do `@tfds`; testes; CMS; componentes novos no DS; tema único dark.

### Critérios de aceitação

1. `git branch -a` mostra apenas `main` e `develop` (+ remotes)
2. Zero `any` e zero `key={index}` em `src/`; `'use client'` apenas onde há hooks/Motion
3. Animações desabilitadas sob `prefers-reduced-motion`
4. `/pt`, `/en`, `/es` funcionam nos 3 temas; cores só via tokens; fontes Roboto/Poppins
5. `/pt/blog` lista o post placeholder e `/pt/blog/[slug]` o renderiza; slug inexistente → 404
6. Contraste AA (4.5:1) em todos os textos
7. `npm run lint`, `type-check` e `build` verdes; `src/app/api/github/` removida

### Riscos

- Merge → main sem deploy testável (dependência `file:../tf.ds` bloqueia Vercel — tarefa separada, fora desta spec)
- Blog em produção com 1 post placeholder: trocar por post real antes de divulgar o site

---

## 2. Design

### 2.1 Tradução visual: protótipo → identidade @tfds

| Elemento do protótipo                  | Como fica aqui                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------------- |
| Verde ácido `#9dffb0`                  | `text-action-primary` / `bg-action-primary` (accent do tema ativo)                          |
| Fundo `#0a0a0b`                        | `bg-bg-page` (cada tema resolve o seu)                                                      |
| Bordas `rgba(255,255,255,0.07)`        | `border-border-subtle`                                                                      |
| Texto `foreground/35–/55` (reprova AA) | `text-text-secondary` / `text-text-tertiary` (tokens já calibrados)                         |
| Unbounded (display)                    | **Poppins** via `Typography variant="display-*"`                                            |
| JetBrains Mono (eyebrows, chips)       | `font-mono` (stack de sistema) SOMENTE em eyebrows e metadados curtos; corpo segue Roboto   |
| Eyebrow `// seção`                     | Padrão local `SectionHeading` (eyebrow mono + display + subtítulo), composto com Typography |
| Inline styles e hex                    | Proibidos — classes Tailwind com tokens                                                     |

### 2.2 Anatomia das seções (estrutura do protótipo)

- **Hero**: badge de localização/disponibilidade (dot pulsante) → saudação → nome em display gigante (2 linhas, sobrenome no accent) → papel + parágrafo curto → CTAs (ver projetos, baixar CV como `<a download>`) → régua de stats (4+ anos / 3 empresas / DS @ Livelo) → sociais como `<a>` reais
- **Sobre** (nova): grid 1fr/1.5fr — esquerda: título + 4 cards de diferenciais (Frontend, Design Systems, Performance, Do zero ao deploy); direita: narrativa em parágrafos (2022 → Heap → Divam → ília/Alchemy → tf.ds) + rodapé com localização/idiomas/status
- **Experiência**: timeline vertical (linha + dot; dot accent pulsante no atual, badge "atual"), cards com role/empresa/período/descrição/chips de tech; abaixo, 2 cards lado a lado: Formação (ADS Unicarioca) e Certificação (ProgramadorBr). A seção Education separada deixa de existir
- **Projects**: lista numerada (01–06), sem cards nem carousel — linha divisória, número grande esmaecido, título mono, descrição, chips, ícones demo/código como `<a>`. Dados locais
- **Skills**: 3 colunas por categoria com dot colorido (tokens de feedback: success/warning/accent — não hex) + bloco de idiomas
- **Contato**: card único destacado (`bg-action-primary-subtle` + borda), título display, micro-copy "respondo em até 24h", 3 cards info (email/localização/disponibilidade) e botões de canal como `<a>` reais
- **Blog na home**: grid de 3 previews (tags, título, excerpt, data, tempo de leitura) + link "ver todos"

### 2.3 Design técnico

- **Dados locais** (sem CMS): `src/data/projects.ts` e `src/data/posts.ts`, tipados com `interface`, conteúdo do post em markdown string ou TSX. Posts só em pt-BR; UI do blog traduzida nos 3 dicionários
- **Rotas blog**: `src/app/[lang]/blog/page.tsx` e `src/app/[lang]/blog/[slug]/page.tsx` com `generateStaticParams` + `notFound()`
- **Server/client**: seções são Server Components; animação isolada em wrappers client pequenos (ex.: `FadeIn`) para não arrastar a seção inteira pro client
- **Motion**: helper único (`src/lib/motion.ts`) com `useReducedMotion` do Motion; variantes zeradas quando reduzido; todo componente animado consome dele
- **Projects**: curadoria = tf.ds (primeiro), ignite-lab-design-system, dt-money, ignite-timer, imhere, unicarioca-web-backend — com URLs reais do GitHub
- **Componentes DS disponíveis**: Badge, Button, HStack, VStack, Input, Label, Typography. Timeline, SectionHeading, chips de tech e stats são composição local com tokens

---

## 3. Plano de execução

Cada task é um slice vertical: termina com app funcional, `type-check` verde e um conventional commit. Trabalhar em `develop` após a T0.

### T0 — Base git limpa `chore(git)`

- Commitar o working tree de `tfds/migration` (migração DS + workflow `.claude/` + este doc); merge em `develop`; `develop` → `main`; deletar `tfds/migration`, `tfds/button`, `vercel/*` (local + remoto)
- **Pronto:** `git branch -a` só com `main`/`develop`; build verde em `develop`
- **Verificar:** `git branch -a && npm run build`
- ⚠️ Passo destrutivo (deleção de branches) — confirmar com o Thiago antes

### T1 — Débitos de fundação `refactor(sections)`

- Tipar `dict` (padrão `Hero/types.ts`); keys semânticas; remover `Services.tsx`, chaves mortas dos 3 dicionários, deps mortas (`class-variance-authority`, `react-icons`, `tailwindcss-animate` se não usada)
- **Pronto:** `grep -rn ": any\|key={index}" src/` vazio; type-check verde
- **Verificar:** grep + `npm run dev` (home nos 3 idiomas)

### T2 — Infra de motion acessível `feat(motion)`

- `src/lib/motion.ts` + aplicar em todas as animações existentes
- **Pronto/Verificar:** com Reduce Motion ativo no macOS, nada anima na home

### T3 — Projects curados `feat(projects)`

- `src/data/projects.ts`; reescrever `Projects/` como Server Component (lista numerada, §2.2); remover `src/app/api/github/` e Carousel se órfão
- **Pronto:** sem fetch client-side; API deletada
- **Verificar:** browser (3 temas) + `grep -rn "api/github" src/` vazio

### T4 — Hero + Sobre `feat(hero)` `feat(about)` ← **maior risco**

- Hero e About conforme §2.2, dicionários nos 3 idiomas, link Sobre no Header
- **Pronto:** aprovação visual do Thiago nos 3 temas/idiomas — este é o gate que valida o padrão antes de replicar
- **Verificar:** browser; contraste AA nos textos secundários

### T5 — Experiência + Formação `feat(experience)`

- Timeline conforme §2.2; Education sai da page e do Header
- **Verificar:** browser nos 3 idiomas + type-check

### T6 — Skills + Contato `feat(skills)` `feat(contact)`

- Conforme §2.2; nenhum link `#`
- **Verificar:** clicar cada link no browser

### T7 — Blog `feat(blog)`

- `src/data/posts.ts` (1 placeholder pt-BR), rotas, preview na home, link no Header, UI traduzida
- **Verificar:** `/pt/blog`, `/pt/blog/<slug>`, `/pt/blog/nao-existe` (404)

### T8 — Varredura final `chore(release)`

- Checklist `/ship` completo (lint, type-check, build + First Load JS, console.log, contraste 3 temas, navegação 3 idiomas); atualizar `CLAUDE.md`; PR `develop` → `main` via `/pr-description`

### Dependências

```
T0 → T1 → T2 → { T3 ∥ T4 ∥ T5 ∥ T6 } → T7 → T8
```

T3–T6 paralelizáveis. **T4 primeiro entre elas** quando executar em série: é onde a tradução visual é validada; se o padrão mudar ali, muda nas demais.
