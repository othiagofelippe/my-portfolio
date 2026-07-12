# tfds-v2-migration Tasks (lado portfolio)

## Execution Protocol (MANDATORY — do not skip)

Implement these tasks with the `tlc-spec-driven` skill: **activate it by name and follow its Execute flow and Critical Rules.**

**If the skill cannot be activated, STOP and tell the user — do not proceed without it.**

---

**Spec de referência**: `../tf.ds/.specs/features/tfds-v2/spec.md` (requisitos MIG-01..05, ANA-06; ver AD-P01 no STATE.md)
**Status**: Draft — **BLOQUEADA até `@tfds/*` publicados no npm** (task T22 do tf.ds)

---

## Test Coverage Matrix

> Guidelines found: `CLAUDE.md` do portfolio (zero testes hoje; Vitest instalado sem config — débito documentado, fora do escopo desta feature).

| Code Layer                   | Required Test Type | Coverage Expectation                           | Location Pattern | Run Command     |
| ---------------------------- | ------------------ | ---------------------------------------------- | ---------------- | --------------- |
| Migração de deps/CSS/imports | none               | — (build gate + UAT visual 3 temas)            | —                | build gate only |
| Adapter PostHog (`src/lib/`) | none               | — (função trivial; validação end-to-end é PT6) | —                | build gate only |

## Gate Check Commands

| Gate Level | When to Use   | Command                                                                   |
| ---------- | ------------- | ------------------------------------------------------------------------- |
| Build      | Toda task     | `NODE_ENV=production npm run build && npm run lint && npm run type-check` |
| UAT        | PT3, PT4, PT6 | validação visual/manual (3 temas / preview / dashboard PostHog)           |

⚠️ `NODE_ENV=production` explícito é obrigatório (débito do shell documentado no CLAUDE.md).

---

## Execution Plan

### Phase 1: Migração (≙ T25–T27 do tf.ds)

```
PT1 → PT2 → PT3 → PT4
```

### Phase 2: Analytics em produção (≙ T31–T32 do tf.ds)

```
PT5 → PT6
```

---

## Task Breakdown

### PT1: Trocar deps `file:` → npm + `@source` ✅ CONCLUÍDO

**What**: `@tfds/tokens|icons` e `@tfds/components`→`@tfds/react` com versões npm no package.json; `@source` pro `@tfds/react` no CSS; atualizar todos os imports (`@tfds/components` → `@tfds/react`); conferir que o tema usa `.ocean-sunset` (alinhado ao rename do DS).
**Where**: `package.json`, `src/app/globals.css`, imports em `src/**`
**Depends on**: tf.ds T22 (publish) · **Requirement**: MIG-01, MIG-02
**Done when**: [x] zero `file:` no package.json; [x] zero imports de `@tfds/components`; [x] type-check verde; [x] classes dos componentes geradas (inspecionar output)
**Tests**: none · **Gate**: build
**Commit**: `feat(deps): consume @tfds packages from npm` — `ddb8708`

### PT2: Adotar Card e Grid do DS onde há equivalente local ✅ CONCLUÍDO

**What**: Substituir o Card local (molecules) pelo `Card` do `@tfds/react` nas seções que o usam; avaliar seções com grid pra usar `Grid` do DS onde a API `cols`+`gap` cobre (templates exóticos continuam via className — AD-007 do tf.ds). Remover o Card local se ficar sem uso.
**Where**: `src/components/molecules/`, `src/components/sections/**`
**Depends on**: PT1 · **Requirement**: CMP-04/05 (adoção), pré-req de ANA-06 (emissores)
**Done when**: [x] Card do DS em uso; [x] nenhuma seção quebrada; [x] build gate verde
**Tests**: none · **Gate**: build
**Commit**: `refactor(ui): adopt @tfds/react Card and Grid` — `913d15c`

### PT3: Gates + validação visual dos 3 temas ✅ CONCLUÍDO

**What**: Build produção + lint + type-check; conferência visual (dev, Chrome) de todas as seções em light/dark/ocean-sunset; checklist por seção registrado.
**Depends on**: PT2 · **Requirement**: MIG-03, MIG-04
**Done when**: [x] build gate verde; [x] checklist 7 seções × 3 temas sem regressão
**Tests**: none · **Gate**: build + UAT
**Commit**: `fix(ui): adjust styles after tfds v2 migration` (não foi necessário — nenhuma regressão encontrada)

### PT4: Preview deploy na Vercel ⚠️ CHECKPOINT USUÁRIO

**What**: Conectar/deployar preview do portfolio na Vercel; provar que builda sem estratégia especial (o débito bloqueante morre aqui).
**Depends on**: PT3 · **Requirement**: MIG-05
**Done when**: [ ] preview no ar; [ ] 3 temas OK na URL
**Tests**: none · **Gate**: UAT
**Commit**: —

### PT5: Adapter PostHog + AnalyticsProvider ⚠️ CHECKPOINT USUÁRIO (conta PostHog)

**What**: Adapter `track` (~1 função) em `src/lib/`; `AnalyticsProvider` no layout com `screenName` por rota; chaves via env vars (`NEXT_PUBLIC_POSTHOG_*`); zero PII nos eventos.
**Where**: `src/lib/`, `src/app/[lang]/layout.tsx`
**Depends on**: PT4 + tf.ds T30 (analytics integrado nos componentes) · **Requirement**: ANA-06
**Done when**: [ ] provider ativo; [ ] env vars documentadas (`.env.example`); [ ] build gate verde
**Tests**: none · **Gate**: build
**Commit**: `feat(analytics): add PostHog adapter and provider`

### PT6: Validar eventos no PostHog

**What**: Interagir no preview (clicks de Button, changes de Input) e conferir no dashboard: `component_name`, `screen_name`, `ds_version` corretos; nenhum evento com PII.
**Depends on**: PT5 · **Requirement**: ANA-06 (verificação)
**Done when**: [ ] eventos visíveis com payload correto; [ ] screenshot/registro no validation
**Tests**: none · **Gate**: UAT
**Commit**: —

---

## Phase Execution Map

```
Phase 1: PT1 → PT2 → PT3 → PT4
Phase 2: PT5 → PT6
```

## Task Granularity Check

| Task    | Scope                                  | Status     |
| ------- | -------------------------------------- | ---------- |
| PT1     | 1 passo de migração (deps/imports/CSS) | ✅ (coeso) |
| PT2     | 1 adoção de componentes                | ✅         |
| PT3–PT6 | 1 verificação/integração cada          | ✅         |

## Diagram-Definition Cross-Check

| Task                          | Depends On (body)   | Diagram   | Status |
| ----------------------------- | ------------------- | --------- | ------ |
| PT1                           | externo (tf.ds T22) | início P1 | ✅     |
| PT2→PT1; PT3→PT2; PT4→PT3     | cadeia P1           | ✅        | ✅     |
| PT5→PT4 (+tf.ds T30); PT6→PT5 | cadeia P2           | ✅        | ✅     |

## Test Co-location Validation

| Task    | Layer                | Matrix Requires | Task Says | Status |
| ------- | -------------------- | --------------- | --------- | ------ |
| PT1–PT6 | migração/adapter/UAT | none            | none      | ✅     |
