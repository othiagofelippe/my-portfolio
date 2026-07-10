---
description: Conduz refatoração segura de código existente, sem mudar comportamento
---

Refatore: $ARGUMENTS

Regras:

1. Comportamento idêntico — refactor não mistura com feature nem fix
2. Antes: entenda por que o código atual existe (fence de Chesterton) e diga o que vai mudar e por quê; aguarde ok
3. Alvos típicos deste projeto: converter seção client → server component, extrair seção para o padrão pasta (`Hero/` com types/constants), tipar `dict: any`, substituir UI local por `@tfds`
4. Passos pequenos; `npm run type-check` verde a cada passo
5. Escopo estrito: só o que foi pedido — nada de "aproveitar e melhorar" código vizinho
6. Ao final: diff resumido + evidência de que nada quebrou (type-check, build ou browser)
