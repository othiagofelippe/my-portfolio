export interface PostBlock {
  type: 'heading' | 'paragraph'
  text: string
}

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: number
  tags: string[]
  content: PostBlock[]
}

export const posts: Post[] = [
  {
    slug: 'por-que-construi-meu-proprio-design-system',
    title: 'Por que construí meu próprio Design System',
    excerpt:
      'Depois de anos criando e mantendo Design Systems para outras empresas, decidi consolidar tudo que aprendi em um projeto pessoal: o tf.ds.',
    date: '2026-05-12',
    readingTime: 6,
    tags: ['Design Systems', 'React', 'TypeScript'],
    content: [
      {
        type: 'paragraph',
        text: 'Nos últimos anos, trabalhei em times de Design System em mais de uma empresa — criando componentes, definindo tokens, documentando padrões e ajudando outros times a usar tudo isso no dia a dia. Cada projeto ensinou algo diferente sobre o que funciona (e o que não funciona) quando várias pessoas dependem da mesma base de componentes.',
      },
      {
        type: 'heading',
        text: 'O problema de aprender só dentro da empresa',
      },
      {
        type: 'paragraph',
        text: 'Trabalhar em um Design System corporativo tem um limite natural: as decisões de arquitetura, a stack e até o escopo do que pode ser experimentado são definidos pelo contexto da empresa, não por mim. Isso é ótimo para entregar valor rápido, mas deixa pouco espaço para testar ideias fora do que já está validado.',
      },
      {
        type: 'paragraph',
        text: 'Foi aí que comecei o tf.ds — um Design System pessoal, sem prazo, sem stakeholder para agradar além de mim mesmo. Um lugar para experimentar tokens, testar abordagens de composição de componentes e decidir, com calma, o que realmente vale a pena documentar.',
      },
      {
        type: 'heading',
        text: 'O que o tf.ds me ensinou até agora',
      },
      {
        type: 'paragraph',
        text: 'Documentar decisões é tão importante quanto escrever o componente. Um botão com quatro variantes é fácil de construir; explicar por que essas quatro variantes existem — e não cinco — é o que realmente ajuda quem vai usar o sistema depois.',
      },
      {
        type: 'paragraph',
        text: 'Também aprendi a valorizar mais a consistência entre plataformas. Ter tokens que funcionam tanto em React quanto em React Native me obrigou a pensar em abstrações mais simples e menos amarradas a uma única tecnologia.',
      },
      {
        type: 'heading',
        text: 'Próximos passos',
      },
      {
        type: 'paragraph',
        text: 'O tf.ds ainda está em construção — esse próprio portfolio é meu principal campo de testes para ele. A ideia é continuar publicando aqui o que for aprendendo pelo caminho, com menos teoria e mais decisões reais de projeto.',
      },
    ],
  },
]
