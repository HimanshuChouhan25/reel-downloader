"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlaySquare, Image as ImageIcon } from 'lucide-react';

export default function InstagramTabs() {
  const pathname = usePathname();

  return (
    <div className="flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1 w-full max-w-sm mx-auto mb-8 transition-all">
      <Link 
        href="/instagram/reel-downloader"
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
          pathname === '/instagram/reel-downloader' 
            ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
        }`}
      >
        <PlaySquare className="w-4 h-4" />
        <span>Reels</span>
      </Link>
      <Link 
        href="/instagram/story-downloader"
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
          pathname === '/instagram/story-downloader' 
            ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
        }`}
      >
        <ImageIcon className="w-4 h-4" />
        <span>Stories</span>
      </Link>
    </div>
  );
}
