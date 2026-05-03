# 🎯 Portfolio - Contexto do Projeto

> **Objetivo:** Portfolio pessoal moderno com design system robusto e experiência de usuário excepcional.

---

## 📚 Stack Tecnológica

### Core
- **Framework:** Next.js 15.5.2 (App Router)
- **React:** 19.1.0
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS v4
- **Build:** Turbopack

### UI & Components
- **Primitives:** Radix UI (acessibilidade nativa)
- **Variantes:** Class Variance Authority (CVA)
- **Icons:** Lucide React + React Icons
- **Animations:** Motion (Framer Motion) + Embla Carousel

### Features
- **Theming:** next-themes (3 temas: light, dark, ocean-sunset)
- **i18n:** Suporte multilíngue (pt/en/es)
- **Analytics:** Vercel Analytics
- **Audio:** use-sound (efeitos sonoros)

### Tooling
- **Linting:** ESLint (next/core-web-vitals, next/typescript)
- **Formatting:** Prettier + prettier-plugin-tailwindcss
- **Git Hooks:** Husky + Commitlint (conventional commits)
- **Version Control:** Git

---

## 🏗️ Arquitetura do Projeto

```
my-portfolio/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── [lang]/               # Rotas internacionalizadas
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Design tokens + Tailwind
│   │   └── providers/
│   │       └── ThemeProvider.tsx # Context de temas
│   │
│   ├── components/
│   │   ├── atoms/                # Componentes primitivos (Button, Badge)
│   │   ├── molecules/            # Composições simples (Card, ThemeToggle, LanguageSelector)
│   │   ├── organisms/            # Composições complexas (Header)
│   │   └── sections/             # Seções da página
│   │       ├── Hero.tsx
│   │       ├── Projects.tsx
│   │       ├── Skills.tsx
│   │       ├── Experience.tsx
│   │       ├── Education.tsx
│   │       └── Contact.tsx
│   │
│   ├── context/
│   │   └── AudioContext.tsx      # Gerenciamento de sons
│   │
│   ├── dictionaries/             # Traduções i18n
│   │   ├── pt.json
│   │   ├── en.json
│   │   └── es.json
│   │
│   └── lib/
│       └── utils.ts              # Helpers (cn, etc)
│
├── public/                       # Assets estáticos
├── .claude/                      # Configuração Claude Code
│   ├── settings.json
│   ├── agents/                   # Sub-agents especializados
│   └── commands/                 # Slash commands
└── CLAUDE.md                     # Este arquivo
```

---

## 🎨 Design System

### Tokens (globals.css)

**Hierarquia de 2 Camadas:**

1. **Primitive Tokens** - Valores brutos
   ```css
   --font-size-6xl: clamp(2.5rem, 1.5rem + 5vw, 3.75rem)
   --color-neutral-900: #1A1A1A
   ```

2. **Semantic Tokens** - Intenção de uso
   ```css
   --typography-display-size: var(--font-size-6xl)
   --color-background-primary: var(--color-neutral-50)
   ```

### Temas

**3 Temas Completos:**
- `light` (padrão)
- `dark`
- `ocean-sunset` (custom)

**Implementação:**
```tsx
// ThemeProvider.tsx usa next-themes
import { ThemeProvider } from 'next-themes'

// Usuário pode trocar via ThemeToggle.tsx
<ThemeToggle /> // Mostra seletor com 3 opções
```

### Tipografia Fluida

Todos os tamanhos usam `clamp()` para responsividade:
```css
--font-size-6xl: clamp(2.5rem, 1.5rem + 5vw, 3.75rem)
/* Mín: 2.5rem | Preferido: calc baseado em viewport | Máx: 3.75rem */
```

---

## 🧩 Convenções de Código

### Nomenclatura

**Componentes:**
- PascalCase: `Button.tsx`, `ThemeToggle.tsx`
- Prefixo "use" para hooks: `useTheme`, `useSound`

**Arquivos:**
- Componentes UI: `src/components/ui/button.tsx`
- Seções: `src/components/sections/Hero.tsx`
- Utils: `src/lib/utils.ts`

**Classes CSS:**
- Utility-first (Tailwind)
- Design tokens para valores customizados
- `cn()` helper para merge condicional

### Estrutura de Componente

```tsx
import * from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// 1. Definir variantes com CVA
const componentVariants = cva(
  'base-classes', // Classes sempre presentes
  {
    variants: {
      variant: { default: '...', secondary: '...' },
      size: { sm: '...', lg: '...' }
    },
    defaultVariants: { variant: 'default', size: 'sm' }
  }
)

// 2. Interface com VariantProps
interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // Props customizadas
}

// 3. Componente com forwardRef (se necessário)
const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Component.displayName = 'Component'

export { Component, componentVariants }
```

### TypeScript

**Regras:**
- ✅ Tipos explícitos sempre que possível
- ✅ Evitar `any` (desativado no ESLint para casos específicos)
- ✅ Usar interfaces para props de componentes
- ✅ `React.FC` evitado (usar function normal + forwardRef)

---

## ♿ Acessibilidade (WCAG 2.1 AA)

### Padrões Obrigatórios

1. **HTML Semântico**
   ```tsx
   ✅ <button>Click</button>
   ❌ <div onClick={}>Click</div>
   ```

2. **ARIA Labels**
   ```tsx
   <button aria-label="Fechar modal">
     <X /> {/* Ícone sem texto */}
   </button>
   ```

3. **Navegação por Teclado**
   - TAB/SHIFT+TAB funciona em todos elementos interativos
   - ESC fecha modais/dropdowns
   - Focus visible obrigatório

4. **Contraste de Cores**
   - Texto normal: mín 4.5:1
   - Texto grande: mín 3:1
   - Componentes UI: mín 3:1

5. **Alt Text**
   ```tsx
   <Image src="..." alt="Descrição significativa" />
   ```

### AccessibilityPanel

Componente customizado em `src/components/ui/AccessibilityPanel.tsx`:
- Controle de tema
- Controle de sons
- (Futuramente: contraste, tamanho de fonte)

---

## 🌍 Internacionalização (i18n)

**Estrutura:**
- Rotas dinâmicas: `app/[lang]/page.tsx`
- Idiomas suportados: `pt`, `en`
- Implementação: Via parâmetros de rota (não Next-Intl ainda)

**Padrão:**
```tsx
// app/[lang]/page.tsx
export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang // 'pt' ou 'en'
  // Carregar traduções baseado em lang
}
```

---

## 🎵 Sistema de Sons

**Implementação:**
- Biblioteca: `use-sound`
- Context: `AudioContext.tsx`
- Controle: Via AccessibilityPanel

**Uso:**
```tsx
import { useAudio } from '@/context/AudioContext'

function Component() {
  const { playSound, soundEnabled } = useAudio()

  return (
    <button onClick={() => playSound('click')}>
      Click com som
    </button>
  )
}
```

---

## 🚀 Performance

### Otimizações Atuais

1. **Turbopack** - Build mais rápido
2. **Server Components** - Renderização no servidor (padrão Next.js 15)
3. **Motion** - Animações performáticas
4. **Vercel Analytics** - Monitoramento

### Metas

- **Lighthouse Performance:** > 90
- **First Load JS:** < 100kb
- **LCP:** < 2.5s

---

## 📦 Scripts NPM

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm start            # Servidor de produção
npm run lint         # Rodar ESLint
npm run format       # Formatar código com Prettier
npm run format:check # Verificar formatação
npm run type-check   # Verificar tipos TypeScript
```

---

## 🔐 Segurança

### Arquivos Protegidos

**Nunca ler/modificar:**
- `.env*` (bloqueado em `.claude/settings.json`)

**Não commitar:**
- Secrets, API keys, tokens
- `.env.local`, `.env.production`

---

## 🎯 Padrões de Commit

**Formato:** Conventional Commits (enforced por Husky + Commitlint)

```
type(scope?): subject

[optional body]
[optional footer]
```

**Tipos permitidos:**
- `feat:` - Nova feature
- `fix:` - Bug fix
- `refactor:` - Refatoração
- `style:` - Mudanças de estilo (formatação)
- `docs:` - Documentação
- `test:` - Testes
- `chore:` - Tarefas de manutenção

**Exemplo:**
```bash
git commit -m "feat: add dark mode toggle to header"
git commit -m "fix: carousel navigation on mobile devices"
```

---

## 🛠️ Git Hooks (Husky)

### Pre-commit
```bash
npm run lint  # ESLint verifica erros
```

### Commit-msg
```bash
npx commitlint --edit $1  # Valida formato conventional
```

### Pre-push (configurado via Claude Code)
```bash
npm run type-check  # TypeScript
npm run build       # Build completo
```

---

## 🤖 Claude Code - Sub-Agents

**Agentes especializados em `.claude/agents/`:**

1. **code-reviewer.md** - Review de código (qualidade, performance, segurança)
2. **test-engineer.md** - Criação de testes (unitários, a11y)
3. **documentation-writer.md** - Documentação técnica (JSDoc, README)
4. **performance-optimizer.md** - Otimização (bundle, runtime)
5. **accessibility-auditor.md** - Auditoria WCAG 2.1 AA

**Uso:**
```
"Quero que o code-reviewer analise o componente Button"
"Preciso do accessibility-auditor para verificar o Header"
```

---

## 📝 Quando Criar Novo Componente

### Checklist

1. **Estrutura:**
   ```
   components/ui/NewComponent.tsx
   ```

2. **Usar Radix UI** (se aplicável):
   - Button → @radix-ui/react-slot
   - Switch → @radix-ui/react-switch
   - etc.

3. **Padrão CVA:**
   ```tsx
   const newComponentVariants = cva('base', {
     variants: { variant: {...}, size: {...} }
   })
   ```

4. **TypeScript:**
   ```tsx
   interface NewComponentProps
     extends HTMLAttributes<HTMLElement>,
       VariantProps<typeof newComponentVariants> {}
   ```

5. **Acessibilidade:**
   - HTML semântico
   - ARIA labels
   - Navegação por teclado
   - Contraste de cores

6. **Export:**
   ```tsx
   export { NewComponent }
   ```

---

## 🎨 Design Tokens - Como Usar

### Em Tailwind (Recomendado)

```tsx
// ✅ Usar classes Tailwind com tokens
<div className="bg-background-primary text-text-headline">
  Conteúdo
</div>
```

### CSS Direto (Casos Específicos)

```css
.custom-element {
  background: var(--color-background-primary);
  color: var(--color-text-headline);
  font-size: var(--typography-display-size);
}
```

---

## 🎨 Alternância de Cores entre Seções

**Regra:** Seções alternadas usam cores diferentes para criar separação visual clara. Sempre que adicionar ou reordenar uma seção, verificar se a alternância está correta.

| Ordem | Seção      | Background                  |
|-------|------------|-----------------------------|
| 1     | Hero       | `bg-gradient-to-br from-background-primary to-background-secondary` |
| 2     | About      | `bg-background-secondary/30` |
| 3     | Experience | `bg-background-primary`     |
| 4     | Education  | `bg-background-secondary/30` |
| 5     | Projects   | `bg-background-primary`     |
| 6     | Skills     | `bg-background-secondary/30` |
| 7     | Contact    | `bg-background-primary`     |

**Padrão:** par = `bg-background-secondary/30` / ímpar = `bg-background-primary` (Hero é exceção com gradiente).

---

## 🚧 Estado Atual vs Roadmap

### ✅ Implementado

- Design system com tokens (2 camadas: primitive + semantic)
- 3 temas funcionais (light, dark, ocean-sunset)
- Arquitetura de componentes: atoms / molecules / organisms / sections
- Animações com Motion em todas as seções (Hero, Experience, Education, Skills, Contact)
- i18n com 3 idiomas (pt/en/es) via dicionários JSON
- Header com indicador de seção ativa
- Sistema de áudio (AudioContext + use-sound)
- Git hooks (lint + commit + pre-push com type-check e build)
- Claude Code configurado com sub-agents

### 🔜 Próximos Passos

1. Seção Projects com dados reais do GitHub
2. Adicionar testes (Vitest + Testing Library)
3. Configurar Storybook
4. Otimização de performance (Lighthouse > 90)

---

## 💡 Dicas Importantes

### Para Claude Code

1. **Sempre ler globals.css** antes de sugerir cores/espaçamentos
2. **Seguir padrão CVA** para variantes
3. **Priorizar acessibilidade** em toda sugestão
4. **Usar Server Components** por padrão (adicionar 'use client' só se necessário)
5. **Verificar tipos** antes de sugerir código

### Arquivos Chave

- **Design tokens:** `src/app/globals.css`
- **Tipos globais:** `tsconfig.json`
- **Configuração ESLint:** `eslint.config.mjs`
- **Análise completa:** `DESIGN_SYSTEM_ANALYSIS.md`

---

## 📞 Perguntas Frequentes

**Q: Posso usar `any` em TypeScript?**
A: Evite, mas está permitido no ESLint para casos inevitáveis.

**Q: Preciso adicionar 'use client'?**
A: Só se o componente usar hooks (useState, useEffect, etc) ou Motion (motion/react requer client).

**Q: Como adicionar nova cor ao tema?**
A: Editar `globals.css` em todas as seções de tema (root, .dark, .ocean-sunset).

**Q: Prettier vai formatar automaticamente?**
A: Não. Rode `npm run format` manualmente quando quiser.

**Q: Build roda antes de push?**
A: Sim! Hook configurado em `.claude/settings.json`.

---

**Última atualização:** 2025-12-06
**Versão do projeto:** 0.1.0
