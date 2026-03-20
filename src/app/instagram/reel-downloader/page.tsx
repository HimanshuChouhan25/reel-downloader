"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import DownloadForm from '@/components/DownloadForm';
import InstagramTabs from '@/components/InstagramTabs';

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
      const res = await fetch('/api/instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, type: 'reel' }),
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
        <InstagramTabs />
        
        <div className="space-y-4 px-2 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 text-balance leading-tight">
            Reel Downloader
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 font-medium text-balance max-w-xl mx-auto">
            Download high-quality Instagram Reels instantly. Fast, free, and secure.
          </p>
        </div>

        <DownloadForm 
          url={url}
          setUrl={setUrl}
          onSubmit={handleDownload}
          loading={loading}
          placeholder="Paste Instagram Reel URL here..."
          buttonText="Proceed"
        />

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
            className="w-full max-w-[calc(100vw-2rem)] sm:max-w-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-4 sm:p-6 flex flex-col items-center gap-4 sm:gap-6 mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-center gap-2 text-green-400 text-center">
              <CheckCircle2 className="h-6 w-6 sm:h-5 sm:w-5 shrink-0" />
              <span className="font-semibold text-sm sm:text-base text-balance line-clamp-2">
                Ready to download
              </span>
            </div>

            <a
              href={`/api/proxy?url=${encodeURIComponent(videoData.videoUrl)}`}
              download="reel.mp4"
              className="w-full py-3 sm:py-4 px-4 text-sm sm:text-base md:text-lg bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_40px_-10px_rgba(147,51,234,0.5)] active:scale-95 text-center overflow-hidden"
            >
              <Download className="h-5 w-5 shrink-0" />
              <span className="truncate">Download MP4 File</span>
            </a>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
