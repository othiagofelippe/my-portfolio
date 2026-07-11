---
description: Escreve testes para código existente (Vitest + Testing Library)
---

Escreva testes para: $ARGUMENTS

1. Se não houver config do Vitest ainda, crie o mínimo (config + script `test`) primeiro
2. Siga as regras do agent test-engineer: comportamento > implementação, `describe`/`it`, `getByRole`, `userEvent`, mocks mínimos tipados
3. Cubra: caminho feliz, estados de erro/vazio, interação por teclado
4. Rode os testes e reporte o output real
