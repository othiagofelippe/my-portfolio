# 🗂️ Estrutura dos Componentes

Este diretório está organizado de forma lógica para facilitar a manutenção e desenvolvimento.

## 📁 Estrutura de Pastas

```
components/
├── sections/           # Seções principais do site
│   ├── Hero.tsx       # Seção inicial/apresentação
│   ├── Services.tsx   # Seção de serviços
│   ├── Experience.tsx # Experiência profissional
│   ├── Education.tsx  # Formação e qualificações
│   ├── Projects.tsx   # Portfólio de projetos
│   ├── Skills.tsx     # Habilidades técnicas
│   ├── Contact.tsx    # Formulário de contato
│   └── index.ts       # Exportações das seções
├── ui/                # Componentes de interface
│   ├── Header.tsx     # Cabeçalho principal
│   ├── Footer.tsx     # Rodapé
│   ├── Logo.tsx       # Componente do logo
│   ├── LanguageSelector.tsx # Seletor de idioma
│   ├── ThemeToggle.tsx      # Toggle dark/light mode
│   └── index.ts       # Exportações dos componentes UI
├── ScrollToTop.tsx    # Componente individual
└── index.ts          # Exportações principais
```

## 🎯 Categorização

### 📄 **Seções (sections/)**
Componentes que representam seções completas da página:
- **Funcionalidade**: Cada arquivo é uma seção completa do site
- **Responsabilidade**: Layout, conteúdo e interações de uma seção específica
- **Importação**: `import { Hero, Services } from "@/components/sections"`

### 🧩 **UI (ui/)**
Componentes reutilizáveis de interface:
- **Funcionalidade**: Elementos de UI que podem ser usados em várias partes
- **Responsabilidade**: Funcionalidades específicas (navegação, tema, etc.)
- **Importação**: `import { Header, Footer } from "@/components/ui"`

## 📦 Importações Simplificadas

### Antes da Reorganização
```typescript
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
// ... mais imports
```

### Depois da Reorganização
```typescript
// Seções
import {
  Hero,
  Services,
  Experience,
  Education,
  Projects,
  Skills,
  Contact
} from "@/components/sections";

// UI Components
import { Header, Footer } from "@/components/ui";

// Ou tudo de uma vez
import { Hero, Services, Header, Footer } from "@/components";
```

## 🔍 Benefícios

1. **Organização Clara**: Fácil identificar onde está cada tipo de componente
2. **Imports Limpos**: Menos linhas de import, mais legibilidade
3. **Manutenibilidade**: Estrutura lógica facilita manutenção
4. **Escalabilidade**: Fácil adicionar novos componentes nas categorias corretas
5. **Developer Experience**: Melhor autocomplete e navegação no IDE

## 🚀 Adicionando Novos Componentes

### Nova Seção
1. Criar arquivo em `sections/`
2. Adicionar export no `sections/index.ts`
3. Usar: `import { NovaSecao } from "@/components/sections"`

### Novo Componente UI
1. Criar arquivo em `ui/`
2. Adicionar export no `ui/index.ts`
3. Usar: `import { NovoComponente } from "@/components/ui"`

## 📋 Padrões de Nomenclatura

- **Arquivos**: PascalCase (ex: `ThemeToggle.tsx`)
- **Exports**: Named exports (ex: `export { ThemeToggle }`)
- **Estrutura**: Cada arquivo tem apenas um componente principal