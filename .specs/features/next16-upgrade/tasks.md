# Tasks — next16-upgrade

Spec: `.specs/features/next16-upgrade/spec.md` (aprovada 2026-07-19).
Executor: qualquer modelo/sessão — cada task é autocontida, com verificação própria.
Regras gerais: branch a partir de `develop`, nunca commitar direto na `main`,
Conventional Commits, rodar lint + type-check antes de cada commit.

Contexto verificado em 2026-07-19 (não re-derivar):

- Projeto Vercel: `my-portfolio` (`prj_uDUX6lyRlYkz1iZ9K25gTiPf0EW1`, team
  `team_Gd2IiZoJ5nVkNdyxVawIbfY1`), Node 22.x, deploys automáticos via GitHub
- Todos os `params` das páginas já são `Promise` com `await` (compatível Next 16)
- DNS do `othiagofelippe.com` está na Hostinger (MCP `hostinger-mcp` disponível);
  e-mail do domínio é Hostinger — registros MX/SPF/DKIM/DMARC são intocáveis

---

## T1 — CI: modernizar ci.yml `[B2]`

**Branch:** `chore/infra-hardening`
**Arquivos:** `.github/workflows/ci.yml`
**Fazer:**

- `node-version: '20'` → `'22'`
- Step "Type check": `npx tsc --noEmit` → `npm run type-check`
- Novo step "Format check": `npm run format:check` (antes do lint)
- Adicionar no topo do workflow:
  ```yaml
  concurrency:
    group: ${{ github.workflow }}-${{ github.ref }}
    cancel-in-progress: true
  ```

**Pronto quando:** push da branch → workflow `CI / quality-check` verde no Actions.
**Verificar:** `gh run watch` ou `gh run list --branch chore/infra-hardening -L 1`.
**Commit:** `ci: align node with vercel, add format check and concurrency`

## T2 — Dependabot `[B2]` (paralelo a T1, mesma branch)

**Arquivos:** `.github/dependabot.yml` (novo)
**Fazer:** ecosystems `npm` e `github-actions`, `schedule.interval: weekly`,
grupo único para minor+patch de npm (majors ficam em PRs individuais), `target-branch: develop`.
**Pronto quando:** arquivo válido no repo (o GitHub valida ao fazer push).
**Verificar:** após merge, Insights → Dependency graph → Dependabot mostra os jobs agendados.
**Commit:** `ci: add dependabot for npm and github-actions`

## T3 — Configurações do repo GitHub `[B2]` (depende de T1 mergeada na main via PR)

**Arquivos:** nenhum (API do GitHub via `gh`)
**Fazer:**

```bash
# secret scanning + push protection + dependabot security updates
gh api -X PATCH repos/othiagofelippe/my-portfolio \
  -f security_and_analysis[secret_scanning][status]=enabled \
  -f security_and_analysis[secret_scanning_push_protection][status]=enabled
gh api -X PUT repos/othiagofelippe/my-portfolio/automated-security-fixes
# delete branch on merge
gh api -X PATCH repos/othiagofelippe/my-portfolio -F delete_branch_on_merge=true
# branch protection na main: PR obrigatório + check quality-check verde
gh api -X PUT repos/othiagofelippe/my-portfolio/branches/main/protection \
  --input - <<'EOF'
{
  "required_status_checks": { "strict": false, "contexts": ["quality-check"] },
  "enforce_admins": false,
  "required_pull_request_reviews": null,
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
EOF
```

Nota: `required_pull_request_reviews: null` porque o repo é de uma pessoa só — o gate
real é o status check; exigir aprovação travaria o fluxo solo.
**Pronto quando:** `gh api repos/othiagofelippe/my-portfolio/branches/main/protection`
retorna 200 com `quality-check` nos contexts.
**Verificar:** tentar `git push origin HEAD:main` com commit dummy → deve ser rejeitado
(não fazer de verdade se houver dúvida; a resposta 200 da API já é evidência).

## T4 — DNS Hostinger `[B1]` (independente de T1–T3; requer confirmação do usuário antes de executar)

**Arquivos:** nenhum (MCP `hostinger-mcp`, domínio `othiagofelippe.com`)
**Fazer:**

1. `DNS_getDNSSnapshotListV1` — confirmar que existe snapshot recente (rollback)
2. `DNS_deleteDNSRecordsV1`: remover **apenas** — AAAA `@` (`2a02:4780:13:1299:0:2266:77d2:2`) e A `ftp` (`185.245.180.98`)
3. NÃO tocar: MX, TXT (SPF/DMARC), CNAMEs `hostingermail-*`, `autoconfig`,
   `autodiscover`, `www`, A `@` `76.76.21.21`
4. Checar renovação automática do domínio (expira 2026-10-26) via
   `billing_getSubscriptionListV1`; se desativada, avisar o usuário (não ativar sozinho)

**Pronto quando:** `dig +short othiagofelippe.com AAAA` vazio (aguardar TTL 1800s);
`dig +short othiagofelippe.com A` → `76.76.21.21`; site abre em
`https://othiagofelippe.com` e `https://www.othiagofelippe.com`.

## T5 — Upgrade Next 16: deps + codemod `[A]` (depende de T3; T4 não bloqueia)

**Branch:** `feat/next16-upgrade` (a partir de `develop` atualizada)
**Arquivos:** `package.json`, `package-lock.json`, `middleware.ts`→`proxy.ts`,
possivelmente outros apontados pelo codemod
**Fazer:**

1. `npx @next/codemod@latest upgrade latest` — aceitar next@16, react 19.2.x,
   eslint-config-next@16; revisar TODO o diff antes de aceitar
2. Confirmar rename `middleware.ts` → `proxy.ts` com export `proxy` (se o codemod não
   fizer, fazer manualmente — mesma lógica, só nome)
3. Remover `--turbopack` dos scripts `dev` e `build`
4. Registrar o First Load JS ANTES (rodar `npm run build` na develop antes de começar
   e guardar o output) e DEPOIS — anotar ambos no commit ou no STATE.md

**Pronto quando:** `npm run build && npm run type-check && npm run lint` verdes,
sem warnings de deprecação do Next.
**Verificar (manual, dev server):**

- `curl -sI -H "Accept-Language: en" localhost:3000/ | grep -i location` → `/en`
  (repetir com `pt` e `es`) — valida o proxy renomeado
- Browser: home, `/pt/blog`, um post individual; troca de tema nos 3 temas;
  sons e animações Motion funcionando (candidatos a quebra: `motion`, `use-sound`)

**Commit:** `feat(deps): upgrade to next 16 and react 19.2`
(mudanças mecânicas do codemod podem ir em commit separado `refactor: apply next 16 codemod`)

## T6 — React Compiler `[A]` (depende de T5, mesma branch, commit separado)

**Arquivos:** `next.config.ts`
**Fazer:** adicionar `reactCompiler: true`. Se o build ou o runtime quebrar
(violação de regras de hooks em alguma seção client), NÃO corrigir o componente nesta
task: reverter a flag, registrar o achado no STATE.md e seguir — vira follow-up.
**Pronto quando:** build verde + smoke test manual das seções client
(Hero, About, Experience, Skills, Contact, Header — animações e áudio OK).
**Commit:** `feat(perf): enable react compiler`

## T7 — PR, deploy preview e fechamento `[A]`

**Fazer:**

1. PR `feat/next16-upgrade` → `develop`; CI (novo, do T1) verde
2. Merge → validar deploy preview do `develop` na Vercel (READY + smoke test na URL,
   3 temas) — dá pra checar via MCP da Vercel (`list_deployments`)
3. PR `develop` → `main` (agora exige check verde, T3) → produção
4. Atualizar `.specs/STATE.md` (fechar PT4 antigo + registrar next16-upgrade) e
   `CLAUDE.md` (versão do Next, proxy.ts, First Load JS novo)

**Pronto quando:** produção READY no commit do upgrade, docs atualizados.
**Commit (docs):** `docs: record next 16 upgrade and close tfds-v2 PT4 checkpoint`

---

## Ordem e paralelismo

```
T1 ─┬─ (mesma branch) ─ T2 ─→ PR → main ─→ T3 ─→ T5 ─→ T6 ─→ T7
T4 ────────────────────────────────────────────────────────↑ (independente; só precisa
                                                             estar OK antes do fechamento)
```

T1+T2 são um PR só. T4 pode rodar a qualquer momento (após confirmação do usuário).

## Task de maior risco: T5

React 19.2 é baseado em canary e `motion`/`use-sound` são as deps com maior acoplamento
a internals do React — quebra apareceria só em runtime (por isso o smoke test manual é
obrigatório, não opcional). Mitigação: T5 e T6 em commits separados permitem bisect e
revert cirúrgico; o CI novo (T1) já protege o merge.
