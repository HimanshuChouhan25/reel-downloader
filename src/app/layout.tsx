import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Media Downloader Hub',
  description: 'Download Instagram Reels, YouTube Videos, and Snapchat Spotlights instantly using our fast, free, and secure web application.',
  keywords: 'Instagram Reel Downloader, YouTube to MP3, Save Insta Video, IG Video Downloader, Download Reels, Free Downloader',
  openGraph: {
    title: 'Media Downloader Hub',
    description: 'Instantly download your favorite social media content.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-white min-h-screen antialiased flex flex-col`}>
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>
        </div>

        <Navbar />
        <main className="relative z-10 flex-1 flex flex-col min-h-[calc(100vh-140px)]">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
