import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de badge do design system. Construído com Class Variance Authority (CVA). Suporta 3 variantes semânticas, 3 tamanhos e integração total com design tokens.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['brand', 'neutral', 'success'],
      description: 'Estilo visual do badge',
      table: {
        type: { summary: 'brand | neutral | success' },
        defaultValue: { summary: 'brand' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Tamanho do badge',
      table: {
        type: { summary: 'sm | default | lg' },
        defaultValue: { summary: 'default' },
      },
    },
    children: {
      control: 'text',
      description: 'Conteúdo do badge',
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

/**
 * Playground interativo - Use os controles abaixo para experimentar diferentes configurações
 */
export const Playground: Story = {
  args: {
    children: 'Badge',
    variant: 'brand',
    size: 'default',
  },
}

/**
 * Variantes semânticas disponíveis no design system
 */
export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Brand:** Tags/skills principais (destaque)\n\n**Neutral:** Informações neutras (linguagens, tipos)\n\n**Success:** Status positivo (períodos ativos, certificações)',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-background-secondary/30 border-border-primary/10 flex flex-col items-center gap-3 rounded-lg border p-6">
          <Badge variant="brand">Brand</Badge>
          <div className="text-center">
            <p className="typography-body-sm text-text-headline font-medium">
              Brand
            </p>
            <p className="typography-caption text-text-body mt-1">
              Tags e skills principais
            </p>
          </div>
        </div>

        <div className="bg-background-secondary/30 border-border-primary/10 flex flex-col items-center gap-3 rounded-lg border p-6">
          <Badge variant="neutral">Neutral</Badge>
          <div className="text-center">
            <p className="typography-body-sm text-text-headline font-medium">
              Neutral
            </p>
            <p className="typography-caption text-text-body mt-1">
              Informações neutras
            </p>
          </div>
        </div>

        <div className="bg-background-secondary/30 border-border-primary/10 flex flex-col items-center gap-3 rounded-lg border p-6">
          <Badge variant="success">Success</Badge>
          <div className="text-center">
            <p className="typography-body-sm text-text-headline font-medium">
              Success
            </p>
            <p className="typography-caption text-text-body mt-1">
              Status positivo
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Tamanhos disponíveis
 */
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Três tamanhos para diferentes contextos e hierarquias visuais.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-background-secondary/30 border-border-primary/10 flex flex-col items-center gap-3 rounded-lg border p-6">
          <Badge variant="brand" size="sm">
            Small
          </Badge>
          <div className="text-center">
            <p className="typography-body-sm text-text-headline font-medium">
              Small
            </p>
            <p className="typography-caption text-text-body mt-1">
              <code className="bg-background-secondary/50 rounded px-2 py-0.5 text-xs">
                px-2 py-0.5 text-xs
              </code>
            </p>
          </div>
        </div>

        <div className="bg-background-secondary/30 border-border-primary/10 flex flex-col items-center gap-3 rounded-lg border p-6">
          <Badge variant="brand" size="default">
            Default
          </Badge>
          <div className="text-center">
            <p className="typography-body-sm text-text-headline font-medium">
              Default
            </p>
            <p className="typography-caption text-text-body mt-1">
              <code className="bg-background-secondary/50 rounded px-2 py-0.5 text-xs">
                px-2.5 py-0.5
              </code>
            </p>
          </div>
        </div>

        <div className="bg-background-secondary/30 border-border-primary/10 flex flex-col items-center gap-3 rounded-lg border p-6">
          <Badge variant="brand" size="lg">
            Large
          </Badge>
          <div className="text-center">
            <p className="typography-body-sm text-text-headline font-medium">
              Large
            </p>
            <p className="typography-caption text-text-body mt-1">
              <code className="bg-background-secondary/50 rounded px-2 py-0.5 text-xs">
                px-3 py-1
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Estados visuais do componente
 */
export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Badges suportam estados de hover e focus para navegação por teclado.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="space-y-6">
        <div>
          <p className="typography-body-sm text-text-headline mb-4 font-medium">
            Normal
          </p>
          <div className="flex gap-3">
            <Badge variant="brand">Brand</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="success">Success</Badge>
          </div>
        </div>

        <div>
          <p className="typography-body-sm text-text-headline mb-4 font-medium">
            Hover (passe o mouse)
          </p>
          <div className="flex gap-3">
            <Badge variant="brand">Hover me</Badge>
            <Badge variant="neutral">Hover me</Badge>
            <Badge variant="success">Hover me</Badge>
          </div>
        </div>

        <div>
          <p className="typography-body-sm text-text-headline mb-4 font-medium">
            Focus (use Tab)
          </p>
          <div className="flex gap-3">
            <Badge variant="brand" tabIndex={0}>
              Focus me
            </Badge>
            <Badge variant="neutral" tabIndex={0}>
              Focus me
            </Badge>
            <Badge variant="success" tabIndex={0}>
              Focus me
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Exemplos de uso real do portfolio
 */
export const Examples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Padrões de uso do Badge nas diferentes seções do portfolio.',
      },
    },
  },
  render: () => (
    <div className="max-w-3xl space-y-10 p-8">
      <div>
        <h3 className="typography-h5 text-text-headline mb-6">Projetos</h3>
        <div className="space-y-4">
          <div>
            <p className="typography-body-sm text-text-body mb-2">
              Linguagem do projeto:
            </p>
            <Badge variant="neutral">TypeScript</Badge>
          </div>
          <div>
            <p className="typography-body-sm text-text-body mb-2">
              Tags do projeto:
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="brand">React</Badge>
              <Badge variant="brand">Next.js</Badge>
              <Badge variant="brand">Tailwind</Badge>
              <Badge variant="brand">TypeScript</Badge>
              <Badge variant="neutral">+3</Badge>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="typography-h5 text-text-headline mb-6">Habilidades</h3>
        <div>
          <p className="typography-body-sm text-text-body mb-2">
            Skills principais:
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="brand">JavaScript</Badge>
            <Badge variant="brand">TypeScript</Badge>
            <Badge variant="brand">React</Badge>
            <Badge variant="brand">Node.js</Badge>
            <Badge variant="brand">PostgreSQL</Badge>
          </div>
        </div>
      </div>

      <div>
        <h3 className="typography-h5 text-text-headline mb-6">Experiência</h3>
        <div className="space-y-4">
          <div>
            <p className="typography-body-sm text-text-body mb-2">
              Período ativo:
            </p>
            <Badge variant="success">2023 - Presente</Badge>
          </div>
          <div>
            <p className="typography-body-sm text-text-body mb-2">
              Tecnologias utilizadas:
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="neutral">React</Badge>
              <Badge variant="neutral">Node.js</Badge>
              <Badge variant="neutral">PostgreSQL</Badge>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="typography-h5 text-text-headline mb-6">Educação</h3>
        <div className="space-y-4">
          <div>
            <p className="typography-body-sm text-text-body mb-2">
              Tipo de formação:
            </p>
            <Badge variant="neutral">Presencial</Badge>
          </div>
          <div>
            <p className="typography-body-sm text-text-body mb-2">
              Tecnologias da certificação:
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">JavaScript</Badge>
              <Badge variant="success">React</Badge>
              <Badge variant="success">Node.js</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}
