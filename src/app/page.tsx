"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Link2, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoData, setVideoData] = useState<{ videoUrl: string, thumbnail?: string, title?: string } | null>(null);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setError('');
    setVideoData(null);
    
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to download video');
      }
      
      setVideoData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-24">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl flex flex-col items-center text-center space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50">
            Reel Downloader
          </h1>
          <p className="text-lg text-slate-400 font-medium">
            Download high-quality Instagram Reels instantly. Fast, free, and secure.
          </p>
        </div>

        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-2 sm:p-4 mt-8 transition-all hover:border-white/20">
          <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Link2 className="h-5 w-5 text-slate-400" />
              </div>
              <input 
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste Instagram Reel URL here..."
                required
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-slate-500 transition-all font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url}
              className="px-8 py-4 bg-white text-black hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  <span>Download</span>
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-left"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </motion.div>
        )}

        {videoData && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">Ready to download</span>
            </div>
            
            <a 
              href={videoData.videoUrl}
              download="reel.mp4"
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_40px_-10px_rgba(147,51,234,0.5)] active:scale-95"
            >
              <Download className="h-5 w-5" />
              <span>Download MP4 File</span>
            </a>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
