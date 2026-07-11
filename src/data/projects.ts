import { Locale } from '@/lib/i18n'

export interface Project {
  number: string
  name: string
  description: Record<Locale, string>
  tags: string[]
  year: string
  url: string
  demo: string | null
}

export const projects: Project[] = [
  {
    number: '01',
    name: 'tf.ds',
    description: {
      pt: 'Design system próprio, opinativo, com componentes e tokens reutilizáveis para projetos pessoais e profissionais — inclusive este portfolio.',
      en: 'A professional, opinionated design system with reusable components and tokens for personal and professional projects — including this portfolio.',
      es: 'Un design system propio y con criterio, con componentes y tokens reutilizables para proyectos personales y profesionales — incluido este portfolio.',
    },
    tags: ['TypeScript'],
    year: 'mai. 2026',
    url: 'https://github.com/othiagofelippe/tf.ds',
    demo: null,
  },
  {
    number: '02',
    name: 'ignite-lab-design-system',
    description: {
      pt: 'Design system criado durante evento da Rocketseat com as melhores práticas de desenvolvimento, usando Storybook, Radix UI e React.',
      en: 'A design system built during a Rocketseat event, applying development best practices with Storybook, Radix UI and React.',
      es: 'Design system creado durante un evento de Rocketseat aplicando las mejores prácticas de desarrollo, con Storybook, Radix UI y React.',
    },
    tags: ['TypeScript', 'axios', 'radix-ui', 'react'],
    year: 'out. 2022',
    url: 'https://github.com/othiagofelippe/ignite-lab-design-system',
    demo: 'https://ignite-lab-design-system-eosin.vercel.app',
  },
  {
    number: '03',
    name: 'dt-money',
    description: {
      pt: 'App de controle financeiro desenvolvido durante curso da Rocketseat. Foco em React, Styled Components e boas práticas de desenvolvimento web.',
      en: 'A personal finance app built during a Rocketseat course, focused on React, Styled Components and web development best practices.',
      es: 'App de control financiero desarrollada durante un curso de Rocketseat, con foco en React, Styled Components y buenas prácticas de desarrollo web.',
    },
    tags: ['TypeScript', 'axios', 'radix-ui', 'react', 'reacthookform'],
    year: 'jan. 2023',
    url: 'https://github.com/othiagofelippe/dt-money',
    demo: 'https://dt-money-nine-indol.vercel.app',
  },
  {
    number: '04',
    name: 'ignite-timer',
    description: {
      pt: 'Temporizador Pomodoro com foco em React e Styled Components, desenvolvido durante o Ignite da Rocketseat com React Hook Form e React Router.',
      en: "A Pomodoro timer focused on React and Styled Components, built during Rocketseat's Ignite with React Hook Form and React Router.",
      es: 'Temporizador Pomodoro con foco en React y Styled Components, desarrollado durante el Ignite de Rocketseat con React Hook Form y React Router.',
    },
    tags: ['TypeScript', 'react', 'reacthookform', 'reactrouter'],
    year: 'dez. 2022',
    url: 'https://github.com/othiagofelippe/ignite-timer',
    demo: 'https://ignite-timer-virid-zeta.vercel.app',
  },
  {
    number: '05',
    name: 'imhere',
    description: {
      pt: 'App de lista de presença em React Native desenvolvido durante o Ignite da Rocketseat, explorando CRUD e navegação mobile.',
      en: "An attendance-list app in React Native built during Rocketseat's Ignite, exploring CRUD flows and mobile navigation.",
      es: 'App de lista de presencia en React Native desarrollada durante el Ignite de Rocketseat, explorando CRUD y navegación mobile.',
    },
    tags: ['TypeScript', 'react-native'],
    year: 'ago. 2022',
    url: 'https://github.com/othiagofelippe/imhere',
    demo: 'https://snack.expo.dev/@othiagofelippe/github.com-othiagofelippe-imhere',
  },
  {
    number: '06',
    name: 'unicarioca-web-backend',
    description: {
      pt: 'Projeto de extensão universitária em Web Back-End desenvolvido na Unicarioca, explorando Python e fundamentos de backend.',
      en: 'A university extension project in Web Back-End developed at Unicarioca, exploring Python and backend fundamentals.',
      es: 'Proyecto de extensión universitaria en Web Back-End desarrollado en Unicarioca, explorando Python y fundamentos de backend.',
    },
    tags: ['Python'],
    year: 'mar. 2026',
    url: 'https://github.com/othiagofelippe/unicarioca-web-backend',
    demo: null,
  },
]
