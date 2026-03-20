import Link from 'next/link';
import { Download, Instagram, Youtube, MonitorPlay, Ghost } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="relative z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-purple-400 transition shrink-0">
            <Download className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-bold text-lg sm:text-xl tracking-tight hidden sm:block truncate">MediaDownloader Hub</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
            <Link href="/instagram/reel-downloader" className="flex items-center gap-1.5 text-slate-300 hover:text-pink-500 transition">
              <Instagram className="h-4 w-4" />
              <span className="hidden md:block">Instagram</span>
            </Link>
            <Link href="/youtube/to-mp3" className="flex items-center gap-1.5 text-slate-300 hover:text-red-500 transition">
              <Youtube className="h-4 w-4" />
              <span className="hidden md:block">YouTube</span>
            </Link>
            <Link href="/snapchat/spotlight-downloader" className="flex items-center gap-1.5 text-slate-300 hover:text-yellow-400 transition">
              <Ghost className="h-4 w-4" />
              <span className="hidden md:block">Snapchat</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
