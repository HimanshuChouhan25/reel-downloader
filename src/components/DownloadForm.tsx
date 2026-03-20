"use client";

import { Link2, Loader2, ClipboardPaste } from 'lucide-react';

interface DownloadFormProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  placeholder?: string;
  buttonText?: string;
}

export default function DownloadForm({ 
  url, 
  setUrl, 
  onSubmit, 
  loading, 
  placeholder = "Paste URL here...", 
  buttonText = "Proceed" 
}: DownloadFormProps) {

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard: ', err);
      alert('Please allow clipboard permissions to use this feature.');
    }
  };

  return (
    <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-2 sm:p-4 mt-8 transition-all hover:border-white/20">
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Link2 className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            required
            className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-slate-500 transition-all font-medium text-sm sm:text-base md:text-lg"
          />
          <button
            type="button"
            onClick={handlePaste}
            title="Paste from clipboard"
            className="absolute inset-y-0 right-3 sm:right-4 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ClipboardPaste className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
        <button
          type="submit"
          disabled={loading || !url}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-sm sm:text-base md:text-lg"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
          ) : (
            <span>{buttonText}</span>
          )}
        </button>
      </form>
    </div>
  );
}
