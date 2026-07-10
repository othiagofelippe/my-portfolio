---
description: Gera mensagem de commit (Conventional Commits) a partir do diff staged
---

Gere a mensagem de commit para as mudanças atuais.

1. Rode `git status` e `git diff --staged` (se nada staged, analise o working tree e sugira o que stagear — commits pequenos e focados; proponha split se o diff misturar assuntos)
2. Formato: `type(scope): subject` — types permitidos pelo commitlint: feat, fix, refactor, style, docs, test, chore
3. Subject em inglês, imperativo, minúsculo, sem ponto final
4. Body só se o porquê não for óbvio pelo diff
5. Antes de sugerir commit, confirme que `npm run lint` passa (hook do Husky vai rodá-lo de qualquer forma)
6. Mostre a mensagem e aguarde ok antes de commitar
