---
description: Diagnostica um bug ou comportamento inesperado antes de corrigir
---

Investigue: $ARGUMENTS

Processo — diagnóstico ANTES de correção:

1. Reproduza ou localize a evidência concreta (erro, output, screenshot descrito)
2. Formule 2–3 hipóteses e verifique cada uma no código/runtime — não corrija pela primeira intuição
3. Se o bug parecer vir de um componente `@tfds`, verifique no source do DS (`../tf.ds`) antes de contornar aqui — a correção pode pertencer ao DS
4. Explique a causa raiz em 2–3 frases
5. Só então proponha a correção mínima e aguarde ok para aplicar
6. Após aplicar: prove com o mesmo cenário que falhava (type-check, browser, teste)
