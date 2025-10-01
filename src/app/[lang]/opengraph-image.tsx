import { ImageResponse } from 'next/og'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/lib/i18n'

export const runtime = 'edge'
export const alt = 'Thiago Felippe - Front-End Developer Portfolio'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f0f11 0%, #1a1a1f 50%, #0f0f11 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Accent line top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #5A86F7 0%, #7B9FFF 100%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '32px',
          }}
        >
          {/* Name */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            {dict.hero.name}
          </h1>

          {/* Role - first part only */}
          <p
            style={{
              fontSize: '36px',
              color: '#5A86F7',
              margin: 0,
              fontWeight: 600,
              maxWidth: '900px',
              lineHeight: 1.3,
            }}
          >
            {dict.hero.role.split('.')[0]}
          </p>

          {/* Skills badges */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '24px',
            }}
          >
            {dict.hero.skills.slice(0, 4).map((skill: string) => (
              <div
                key={skill}
                style={{
                  background: 'rgba(90, 134, 247, 0.15)',
                  border: '2px solid rgba(90, 134, 247, 0.3)',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontSize: '28px',
                  color: '#FFFFFF',
                  fontWeight: 500,
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: '#888888',
            fontSize: '24px',
          }}
        >
          <span>othiagofelippe.com</span>
          <span style={{ color: '#5A86F7' }}>•</span>
          <span>{dict.contact.info.location}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
