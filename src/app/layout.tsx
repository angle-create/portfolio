import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My professional portfolio website',
  icons: {
    icon: [
      { url: '/static/images/favicon.ico', type: 'image/x-icon' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${inter.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow bg-white dark:bg-primary">
            {children}
          </main>
          <Footer />
        </div>
        <div className="fixed bottom-4 right-4">
          <ThemeToggle />
        </div>
      </body>
    </html>
  )
} 