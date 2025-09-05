import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Poppins (Headers)
        '6xl': ['60px', { lineHeight: '60px', fontWeight: '700' }], // Hero principal
        '5xl': ['48px', { lineHeight: '48px', fontWeight: '500' }], // Seções principais
        '4xl': ['36px', { lineHeight: '40px', fontWeight: '500' }], // Títulos grandes
        '3xl': ['30px', { lineHeight: '36px', fontWeight: '500' }], // Subtítulos
        '2xl': ['24px', { lineHeight: '32px', fontWeight: '500' }], // Card titles
        'xl': ['20px', { lineHeight: '28px', fontWeight: '500' }],  // Pequenos títulos
        
        // Roboto (Body)
        'lg': ['18px', { lineHeight: '28px', fontWeight: '500' }],  // Lead paragraphs
        'base': ['16px', { lineHeight: '24px', fontWeight: '400' }], // Corpo principal
        'sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],   // Texto secundário
        'xs': ['12px', { lineHeight: '16px', fontWeight: '300' }],   // Legendas/Labels sutis
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      colors: {
        // Light/Dark theme colors
        background: {
          primary: {
            DEFAULT: '#FFFFFF',
            dark: '#121214',
          },
          secondary: '#202024',
          tertiary: '#29292E',
        },
        text: {
          headline: {
            DEFAULT: '#323238',
            dark: '#FFFFFF',
          },
          label: {
            DEFAULT: '#FFFFFF',
            dark: '#E1E1E6',
          },
          heading: {
            DEFAULT: '#E1E1E6',
            dark: '#C4C4CC',
          },
          body: {
            DEFAULT: '#C4C4CC',
            dark: '#7C7C8A',
          },
          span: {
            DEFAULT: '#7C7C8A',
            dark: '#323238',
          },
        },
        border: {
          primary: '#3D3D3D',
        },
        accent: {
          brand: '#5A86F7',
          'brand-dark': '#284DAA',
          green: '#00875F',
          'green-dark': '#015F43',
          'green-light': '#00B37E',
          red: '#F75A68',
          'red-dark': '#AA2834',
        },
      },
    },
  },
  plugins: [],
}

export default config