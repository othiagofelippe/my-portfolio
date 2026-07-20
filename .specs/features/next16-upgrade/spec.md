# Spec — Upgrade Next.js 16 + Hardening de infra

**Status:** aprovada (spec e tasks) · **Data:** 2026-07-19

## Objetivo

Subir o portfolio para Next.js 16 (routing novo com layout deduplication + prefetch
incremental, React 19.2, React Compiler estável) atacando o débito de First Load JS
(~216kB) e destravando `<ViewTransition>` estável para o juice futuro. Junto, corrigir
os problemas de infra descobertos na auditoria de 2026-07-19 (DNS e GitHub).

## Parte A — Upgrade Next.js 15.5.20 → 16

### Escopo

**Entra:**

- `next@16` + `eslint-config-next@16` + `react`/`react-dom` 19.2.x
- Codemod oficial `npx @next/codemod@latest upgrade latest` com revisão do diff
- `middleware.ts` → `proxy.ts` (export `proxy`) e validação do redirect de locale
- Remover flags `--turbopack` dos scripts `dev`/`build` (default na 16)
- Ativar React Compiler (`reactCompiler: true` em `next.config.ts`)
- Validar deps client-heavy em runtime: `motion`, `next-themes`, `use-sound`, `@tfds/react`

**NÃO entra:** Cache Components / `use cache`, View Transitions, refactors de seções,
criação de testes.

### Critérios de aceitação

1. `npm run build`, `npm run type-check` e `npm run lint` verdes, sem warnings de
   deprecação do Next
2. Redirect de locale funciona: `/` → `/pt|en|es` conforme `accept-language` (3 línguas)
3. Home, blog, post individual e troca de tema OK em runtime nos 3 temas
4. First Load JS registrado antes/depois no output do build (evidência, sem meta fixa)
5. Deploy preview na Vercel verde

### Fatos verificados (2026-07-19)

- Todos os `params` já são `Promise` com `await` — compatíveis com 16
- Node: local v23, Vercel 22.x — ambos ≥ 20.9 ✅ (CI está em 20 — corrigido na Parte B)
- Turbopack já é o bundler em dev e build

### Riscos

- React 19.2 canary-based: `motion` e `use-sound` são os candidatos a quebra → critério 3
- React Compiler pode expor violação de regras de hooks → rollback barato (desativar flag)
- `eslint-config-next@16` pode trazer regras novas → lint failures pontuais

## Parte B — Hardening de infra (independente, pode ir antes do upgrade)

### B1. DNS (Hostinger — `othiagofelippe.com`)

- Remover AAAA do apex (`2a02:4780:...` — IPv6 residual da Hostinger; visitantes IPv6
  no apex podem cair no servidor errado em vez da Vercel)
- Remover registro `ftp` (A `185.245.180.98`, sobra sem uso)
- Manter intactos: MX/SPF/DKIM/DMARC (e-mail Hostinger), `www` → `cname.vercel-dns.com`,
  A `76.76.21.21` no apex
- Verificar renovação automática do domínio (expira 2026-10-26)

**Aceitação:** `dig othiagofelippe.com AAAA` sem resposta da Hostinger; site abre no
apex e no `www` em IPv4; e-mail continua recebendo.

### B2. GitHub (repo `othiagofelippe/my-portfolio`)

- Branch protection na `main`: exigir PR + check `quality-check` verde
- Ativar secret scanning + push protection (grátis em repo público)
- Criar `.github/dependabot.yml`: npm semanal com grupo de minors/patches +
  `github-actions`; ativar dependabot security updates
- CI (`ci.yml`): Node 20 → 22 (alinhar com Vercel), usar `npm run type-check`,
  adicionar `npm run format:check`, adicionar `concurrency` com cancel
- Ativar `delete_branch_on_merge`

**Aceitação:** push direto na `main` bloqueado; CI verde no ci.yml novo; primeiro PR do
Dependabot abre (ou agendamento visível em Insights → Dependency graph).

### Fora do escopo (registrado para depois)

- Lighthouse CI nos PRs (após o upgrade, junto do trabalho de performance)
- DMARC `p=none` → `quarantine`
- View Transitions (spec própria, após Parte A)

## Ordem sugerida

B2 (CI/protection) → B1 (DNS) → A (upgrade, já protegido pelo CI novo)

## Arquivos afetados

`package.json`, `package-lock.json`, `next.config.ts`, `middleware.ts`→`proxy.ts`,
`.github/workflows/ci.yml`, `.github/dependabot.yml` (novo) + configurações externas
(GitHub API, DNS Hostinger).
