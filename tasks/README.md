# tasks/

Pasta de tasks da mini-org de agentes para o projeto my-portfolio.

- **Prefixo:** `PORT-` (ex: `PORT-001-add-project-card.md`)
- **Quem cria:** tech-lead (ou usuário diretamente)
- **Quem executa:** developer via skill `start-task`
- **Quem valida:** qa-engineer após conclusão

## Template

Copie o bloco abaixo ao criar uma nova task:

```markdown
# PORT-XXX Título curto e direto

**Projeto:** my-portfolio
**Assignee:** developer
**Status:** backlog
**Depende de:** nenhuma

## Objetivo

Uma ou duas frases sobre o que deve ser feito e por quê.

## Critérios de aceitação

- [ ] Critério específico e verificável
- [ ] WCAG 2.1 AA mantido
- [ ] Testes passando (quando aplicável)

## Arquivos esperados

- `src/components/...`
- `src/dictionaries/...` (se houver string nova)

## Contexto adicional

(opcional) Referências de design, restrições, decisões.

## Log de progresso

(developer preenche durante a execução)

## Impedimentos

Nenhum
```

## Estados

- `backlog` — criada, ainda não iniciada
- `in-progress` — developer está executando
- `blocked` — impedimento ativo (descrito na seção Impedimentos)
- `done` — concluída, commitada, pronta para QA
