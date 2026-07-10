---
description: Gera descrição de PR a partir dos commits do branch atual
---

Gere a descrição do PR do branch atual contra `main`.

1. Rode `git log main..HEAD --oneline` e `git diff main...HEAD --stat`
2. Estrutura: **O que** (1–2 frases), **Por quê**, **Mudanças** (bullets por área), **Como testar** (passos concretos no browser/comandos), **Screenshots** (placeholder se for mudança visual)
3. Título no formato conventional commit
4. Mencione breaking changes e follow-ups conhecidos
5. Mostre o texto; só abra o PR com `gh pr create` se for pedido
