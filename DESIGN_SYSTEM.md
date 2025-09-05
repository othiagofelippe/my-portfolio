# Design System Documentation

Este documento apresenta o design system completo do portfólio, incluindo todos os tokens, componentes e padrões visuais.

## Índice

- [Cores](#cores)
- [Tipografia](#tipografia)
- [Espaçamento](#espaçamento)
- [Border Radius](#border-radius)
- [Padrões de Uso](#padrões-de-uso)

---

## Cores

### Light Theme
```css
/* Backgrounds */
--color-background-primary: #FFFFFF
--color-background-secondary: #F7F8FC
--color-background-tertiary: #FFFFFF

/* Text Colors */
--color-text-headline: #323238  /* Títulos principais */
--color-text-label: #FFFFFF     /* Labels em fundos escuros */
--color-text-heading: #29292E   /* Subtítulos */
--color-text-body: #6B6B7D      /* Texto do corpo */
--color-text-span: #5A5A66      /* Textos secundários */

/* Borders */
--color-border-primary: #323238

/* Accent Colors */
--color-accent-brand: #5A86F7      /* Azul principal */
--color-accent-brand-dark: #2563EB /* Azul escuro */
--color-accent-green: #00875F      /* Verde */
--color-accent-red: #DC2626        /* Vermelho */
```

### Dark Theme
```css
/* Backgrounds */
--color-background-primary: #121214
--color-background-secondary: #202024
--color-background-tertiary: #29292E

/* Text Colors */
--color-text-headline: #FFFFFF     /* Títulos principais */
--color-text-label: #FFFFFF        /* Labels */
--color-text-heading: #E1E1E6      /* Subtítulos */
--color-text-body: #B8B8C4         /* Texto do corpo */
--color-text-span: #9A9AA8         /* Textos secundários */

/* Borders */
--color-border-primary: #29292E

/* Accent Colors */
--color-accent-brand: #5A86F7      /* Azul principal */
--color-accent-brand-dark: #2563EB /* Azul escuro */
```

### Contraste (WCAG AA)
- Texto normal: **≥ 4.5:1**
- Texto grande: **≥ 3:1**
- Elementos interativos: **≥ 3:1**

---

## Tipografia

### Fontes
- **Poppins**: Títulos e headings (pesos: 300, 400, 500, 600, 700)
- **Roboto**: Texto do corpo e UI (pesos: 300, 400, 500, 700)

### Escala Tipográfica
```css
/* 6XL - Títulos principais */
--font-size-6xl: 60px
--line-height-6xl: 60px
--font-weight-6xl: 700

/* 5XL - Títulos de seção */
--font-size-5xl: 48px
--line-height-5xl: 48px
--font-weight-5xl: 500

/* 4XL - Subtítulos grandes */
--font-size-4xl: 36px
--line-height-4xl: 40px
--font-weight-4xl: 500

/* 3XL - Subtítulos médios */
--font-size-3xl: 30px
--line-height-3xl: 36px
--font-weight-3xl: 500

/* 2XL - Subtítulos pequenos */
--font-size-2xl: 24px
--line-height-2xl: 32px
--font-weight-2xl: 500

/* XL - Texto destacado */
--font-size-xl: 20px
--line-height-xl: 28px
--font-weight-xl: 500

/* LG - Texto do corpo grande */
--font-size-lg: 18px
--line-height-lg: 28px
--font-weight-lg: 500

/* Base - Texto padrão */
--font-size-base: 16px
--line-height-base: 24px
--font-weight-base: 400

/* SM - Texto pequeno */
--font-size-sm: 14px
--line-height-sm: 20px
--font-weight-sm: 400

/* XS - Texto muito pequeno */
--font-size-xs: 12px
--line-height-xs: 16px
--font-weight-xs: 300
```

---

## Espaçamento

### Escala de Espaçamento
```css
--spacing-xs: 4px     /* Micro espaçamentos */
--spacing-sm: 8px     /* Pequenos gaps */
--spacing-md: 16px    /* Padrão base */
--spacing-lg: 24px    /* Seções menores */
--spacing-xl: 32px    /* Elementos importantes */
--spacing-2xl: 48px   /* Grandes seções */
--spacing-3xl: 64px   /* Separações maiores */
--spacing-4xl: 96px   /* Espaçamento generoso */
--spacing-5xl: 128px  /* Máximo espaçamento */
```

### Uso Semântico
- **xs/sm**: Padding interno de badges, gaps entre ícones
- **md**: Padding padrão de botões, gaps entre elementos
- **lg/xl**: Espaçamento entre seções, padding de cards
- **2xl/3xl**: Padding de grandes containers
- **4xl/5xl**: Espaçamento entre seções principais

---

## Border Radius

### Escala de Arredondamento
```css
--radius-none: 0px      /* Sem arredondamento */
--radius-xs: 2px        /* Micro arredondamento */
--radius-sm: 4px        /* Sutil */
--radius-md: 8px        /* Padrão para botões */
--radius-lg: 12px       /* Cards e containers */
--radius-xl: 16px       /* Elementos destacados */
--radius-2xl: 24px      /* Grandes containers */
--radius-3xl: 32px      /* Elementos especiais */
--radius-full: 9999px   /* Totalmente arredondado */
```

### Uso por Tipo de Elemento
- **Botões**: `--radius-md` (8px)
- **Cards**: `--radius-lg` (12px)
- **Badges/Pills**: `--radius-full` (9999px)
- **Imagens**: `--radius-xl` ou `--radius-2xl` (16px-24px)
- **Containers especiais**: `--radius-3xl` (32px)
- **Inputs**: `--radius-md` (8px)

---

## Padrões de Uso

### Hierarquia Visual
1. **H1**: `font-poppins text-6xl` - Títulos principais
2. **H2**: `font-poppins text-4xl` - Títulos de seção
3. **H3**: `font-poppins text-xl` - Subtítulos
4. **Body**: `font-roboto text-base` - Texto do corpo
5. **Caption**: `font-roboto text-sm` - Textos pequenos
