import Link from 'next/link';
import { Instagram, Youtube, Ghost } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-24 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 text-balance leading-tight">
          MediaDownloader Hub
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 font-medium max-w-2xl mx-auto text-balance">
          Your one-stop solution for downloading media from Instagram, YouTube, and Snapchat. 
          Fast, free, and secure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Link href="/instagram/reel-downloader" className="group p-6 sm:p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-pink-500/50 hover:bg-white/10 transition-all flex flex-col items-center text-center gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 bg-pink-500/20 text-pink-500 rounded-2xl group-hover:scale-110 transition-transform">
            <Instagram className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Instagram Reels</h2>
          <p className="text-slate-400 text-xs sm:text-sm px-2 text-balance">Download high-quality Instagram Reels instantly.</p>
        </Link>
        
        <Link href="/youtube/downloader" className="group p-6 sm:p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all flex flex-col items-center text-center gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 bg-red-500/20 text-red-500 rounded-2xl group-hover:scale-110 transition-transform">
            <Youtube className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">YouTube Video</h2>
          <p className="text-slate-400 text-xs sm:text-sm px-2 text-balance">Save YouTube videos in MP4 format.</p>
        </Link>

        <Link href="/snapchat/spotlight-downloader" className="group p-6 sm:p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-yellow-400/50 hover:bg-white/10 transition-all flex flex-col items-center text-center gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 bg-yellow-400/20 text-yellow-400 rounded-2xl group-hover:scale-110 transition-transform">
            <Ghost className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Snapchat Spotlight</h2>
          <p className="text-slate-400 text-xs sm:text-sm px-2 text-balance">Download Snapchat Spotlights securely.</p>
        </Link>
      </div>
    </div>
  );
}
