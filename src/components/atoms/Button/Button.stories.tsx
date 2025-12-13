import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "./Button"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { HiOutlineArrowDownTray, HiOutlineXMark } from "react-icons/hi2"

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de botão do design system. Construído com Radix UI Slot e Class Variance Authority (CVA). Suporta 3 variantes visuais, 4 tamanhos e integração total com design tokens.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
      description: "Estilo visual do botão",
      table: {
        type: { summary: "default | outline | ghost" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "Tamanho do botão",
      table: {
        type: { summary: "default | sm | lg | icon" },
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Estado desabilitado",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    asChild: {
      control: "boolean",
      description: "Renderiza como componente filho (usando Radix Slot)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: "text",
      description: "Conteúdo do botão",
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

/**
 * Playground interativo - Use os controles abaixo para experimentar diferentes configurações
 */
export const Playground: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
}

/**
 * Variantes visuais disponíveis no design system
 */
export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "**Default:** Ações primárias (CTAs principais)\n\n**Outline:** Ações secundárias\n\n**Ghost:** Ações terciárias ou links discretos",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Default */}
        <div className="flex flex-col items-center gap-3 p-6 bg-background-secondary/30 rounded-lg border border-border-primary/10">
          <Button variant="default">Default</Button>
          <div className="text-center">
            <p className="typography-body-sm font-medium text-text-headline">Default</p>
            <p className="typography-caption text-text-body mt-1">Ações primárias</p>
          </div>
        </div>

        {/* Outline */}
        <div className="flex flex-col items-center gap-3 p-6 bg-background-secondary/30 rounded-lg border border-border-primary/10">
          <Button variant="outline">Outline</Button>
          <div className="text-center">
            <p className="typography-body-sm font-medium text-text-headline">Outline</p>
            <p className="typography-caption text-text-body mt-1">Ações secundárias</p>
          </div>
        </div>

        {/* Ghost */}
        <div className="flex flex-col items-center gap-3 p-6 bg-background-secondary/30 rounded-lg border border-border-primary/10">
          <Button variant="ghost">Ghost</Button>
          <div className="text-center">
            <p className="typography-body-sm font-medium text-text-headline">Ghost</p>
            <p className="typography-caption text-text-body mt-1">Ações terciárias</p>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Tamanhos disponíveis para cada tipo de uso
 */
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "**Small (sm):** Botões compactos em espaços reduzidos\n\n**Default:** Tamanho padrão para a maioria dos casos\n\n**Large (lg):** CTAs de destaque\n\n**Icon:** Botões com apenas ícone",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      {/* Text Buttons */}
      <div>
        <h3 className="typography-body-lg font-semibold text-text-headline mb-4">Text Buttons</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Button size="sm">Small</Button>
            <span className="typography-caption text-text-body">h-9 (sm)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="default">Default</Button>
            <span className="typography-caption text-text-body">h-11 (default)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="lg">Large</Button>
            <span className="typography-caption text-text-body">h-12 (lg)</span>
          </div>
        </div>
      </div>

      {/* Icon Buttons */}
      <div>
        <h3 className="typography-body-lg font-semibold text-text-headline mb-4">Icon Buttons</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Button size="icon" aria-label="GitHub">
              <FaGithub />
            </Button>
            <span className="typography-caption text-text-body">11×11 (icon)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="icon" variant="outline" aria-label="LinkedIn">
              <FaLinkedin />
            </Button>
            <span className="typography-caption text-text-body">outline + icon</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="icon" variant="ghost" aria-label="Fechar">
              <HiOutlineXMark />
            </Button>
            <span className="typography-caption text-text-body">ghost + icon</span>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Estados interativos e de acessibilidade
 */
export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Estados visuais para feedback do usuário: normal, hover, focus, active e disabled.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Normal */}
        <div>
          <h3 className="typography-body-lg font-semibold text-text-headline mb-4">Normal</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        {/* Disabled */}
        <div>
          <h3 className="typography-body-lg font-semibold text-text-headline mb-4">Disabled</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="default" disabled>Default</Button>
            <Button variant="outline" disabled>Outline</Button>
            <Button variant="ghost" disabled>Ghost</Button>
          </div>
        </div>
      </div>

      {/* Focus Indicator */}
      <div>
        <h3 className="typography-body-lg font-semibold text-text-headline mb-4">
          Focus (Navegação por Teclado)
        </h3>
        <p className="typography-body-sm text-text-body mb-3">
          Pressione <kbd className="px-2 py-1 bg-background-secondary rounded border border-border-primary">Tab</kbd> para testar o anel de foco
        </p>
        <div className="flex flex-wrap gap-3">
          <Button>Foque aqui</Button>
          <Button variant="outline">Depois aqui</Button>
          <Button variant="ghost">E aqui</Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Exemplos de uso real no projeto
 */
export const Examples: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Casos de uso reais encontrados no portfolio: CTAs principais, botões sociais e links de projeto.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      {/* CTAs */}
      <div className="p-6 bg-background-secondary/30 rounded-lg border border-border-primary/10">
        <h3 className="typography-body-lg font-semibold text-text-headline mb-3">
          Call-to-Actions (Header/Hero)
        </h3>
        <p className="typography-body-sm text-text-body mb-4">Botões de ação principal para conversão</p>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Fale Comigo</Button>
          <Button size="lg">
            <HiOutlineArrowDownTray />
            Baixar CV
          </Button>
        </div>
      </div>

      {/* Social */}
      <div className="p-6 bg-background-secondary/30 rounded-lg border border-border-primary/10">
        <h3 className="typography-body-lg font-semibold text-text-headline mb-3">
          Social Links (Hero/Footer)
        </h3>
        <p className="typography-body-sm text-text-body mb-4">Ícones de redes sociais discretos</p>
        <div className="flex gap-3">
          <Button variant="ghost" size="icon" aria-label="LinkedIn">
            <FaLinkedin />
          </Button>
          <Button variant="ghost" size="icon" aria-label="GitHub">
            <FaGithub />
          </Button>
        </div>
      </div>

      {/* Project Links */}
      <div className="p-6 bg-background-secondary/30 rounded-lg border border-border-primary/10">
        <h3 className="typography-body-lg font-semibold text-text-headline mb-3">
          Project Actions (Projects)
        </h3>
        <p className="typography-body-sm text-text-body mb-4">Links secundários para demonstração e código</p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">Ver Demo</Button>
          <Button variant="outline" size="sm">Ver Código</Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Combinações com ícones
 */
export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: "Botões podem incluir ícones antes ou depois do texto. Ícones são automaticamente dimensionados.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Icon Before */}
        <div>
          <h3 className="typography-body-lg font-semibold text-text-headline mb-4">Ícone à Esquerda</h3>
          <div className="flex flex-col gap-3">
            <Button>
              <HiOutlineArrowDownTray />
              Download
            </Button>
            <Button variant="outline">
              <FaGithub />
              Ver Código
            </Button>
            <Button variant="ghost">
              <FaLinkedin />
              Conectar
            </Button>
          </div>
        </div>

        {/* Icon After */}
        <div>
          <h3 className="typography-body-lg font-semibold text-text-headline mb-4">Ícone à Direita</h3>
          <div className="flex flex-col gap-3">
            <Button>
              Próximo
              <HiOutlineArrowDownTray className="rotate-[-90deg]" />
            </Button>
            <Button variant="outline">
              Abrir
              <HiOutlineXMark className="rotate-45" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
}
