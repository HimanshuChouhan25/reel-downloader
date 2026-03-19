import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reel Downloader - Fast & Free Instagram Video Saver',
  description: 'Download Instagram Reels, Videos, and Photos instantly using our fast, free, and secure web application. High-quality MP4 downloads.',
  keywords: 'Instagram Reel Downloader, Save Insta Video, IG Video Downloader, Download Reels, Free Instagram Downloader',
  openGraph: {
    title: 'Reel Downloader',
    description: 'Instantly download your favorite Instagram Reels and videos.',
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
      <body className={`${inter.className} bg-slate-950 text-white min-h-screen antialiased`}>
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>
        </div>
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
