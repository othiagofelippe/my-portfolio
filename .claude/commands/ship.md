---
description: Checklist de verificação antes de merge/deploy para produção (Vercel)
---

Rode o checklist de ship para: $ARGUMENTS

Execute e reporte cada item com evidência real (não "parece ok"):

1. `npm run lint` — zero erros
2. `npm run type-check` — zero erros
3. `npm run build` — build limpo; anote First Load JS e compare com a meta (<100kb)
4. `npm test` — se existirem testes
5. `git status` — nada esquecido fora do commit; nenhum `console.log` novo (`git diff main...HEAD | grep console.log`)
6. Nenhum secret/token no diff
7. Dependência `file:../tf.ds` — confirme que a estratégia de build da Vercel cobre o DS (se não cobrir, é bloqueante)
8. Verificação manual: suba `npm run dev` e navegue o fluxo afetado nos 3 temas e nos 3 idiomas quando a mudança for visual

Termine com veredito: ✅ pronto para ship ou ❌ bloqueado (com lista do que falta).
