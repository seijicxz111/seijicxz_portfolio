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
        {children}
      </body>
    </html>
  )
}