import './globals.css'
import localFont from 'next/font/local'
import { Space_Mono } from 'next/font/google'
import FontAwesomeLoader from '@/components/FontAwesomeLoader'

const daruma = localFont({
  src: '../public/fonts/DarumadropOne-Regular.woff2',
  variable: '--font-daruma',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space',
})

export const metadata = {
  title: 'eeve',
  description: 'CJ Steeve Cadenas — Web Developer & UI Designer.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${daruma.variable} ${spaceMono.variable}`}
    >
      <head>
        {/* Preload the display font — biggest single FCP win (148KB vs 351KB TTF) */}
        <link
          rel="preload"
          href="/fonts/DarumadropOne-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Preconnect so the async FA load is faster when it fires */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
      </head>
      <body className={`${daruma.variable} ${spaceMono.variable}`}>
        {/* Font Awesome loaded async — never blocks render */}
        <FontAwesomeLoader />
        {/* Hidden SVG filter definitions for sketchy/hand-drawn effect */}
        <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }} aria-hidden="true">
          <defs>
            {/* sketchy-filter / rough-sketch: used for circles and the profile frame */}
            <filter id="sketchy-filter" x="-12%" y="-12%" width="124%" height="124%">
              <feTurbulence type="fractalNoise" baseFrequency="0.042 0.058" numOctaves="4" seed="3" stitchTiles="stitch" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="rough-sketch" x="-12%" y="-12%" width="124%" height="124%">
              <feTurbulence type="fractalNoise" baseFrequency="0.042 0.058" numOctaves="4" seed="3" stitchTiles="stitch" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            {/* rough-pill: for pills, badges, tag pills — slightly less rough */}
            <filter id="rough-pill" x="-6%" y="-18%" width="112%" height="136%">
              <feTurbulence type="fractalNoise" baseFrequency="0.048 0.065" numOctaves="4" seed="7" stitchTiles="stitch" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            {/* sketchy / sketchy-strong / sketchy-text kept for back-compat */}
            <filter id="sketchy" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.065" numOctaves="3" seed="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feMorphology operator="dilate" radius="0.4" in="displaced" result="thick" />
              <feComposite in="thick" in2="SourceGraphic" operator="over" />
            </filter>
            <filter id="sketchy-strong" x="-8%" y="-8%" width="116%" height="116%">
              <feTurbulence type="fractalNoise" baseFrequency="0.055" numOctaves="4" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feMorphology operator="dilate" radius="0.5" in="displaced" result="thick" />
              <feComposite in="thick" in2="SourceGraphic" operator="over" />
            </filter>
            <filter id="sketchy-text" x="-3%" y="-3%" width="106%" height="106%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="12" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  )
}