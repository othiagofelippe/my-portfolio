import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "Size of the button",
    },
    asChild: {
      control: "boolean",
      description: "Render as a child component (using Radix Slot)",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// Default story
export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🚀</Button>
    </div>
  ),
}

// Disabled states
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Default</Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
    </div>
  ),
}

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        Next
      </Button>
      <Button variant="outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        Back
      </Button>
    </div>
  ),
}

// Individual variants for easy testing
export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "default",
  },
}

export const Destructive: Story = {
  args: {
    children: "Delete Account",
    variant: "destructive",
  },
}

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
}

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
}

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
}

export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
  },
}

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
}

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
}

export const Icon: Story = {
  args: {
    children: "🚀",
    size: "icon",
  },
}
