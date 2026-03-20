import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { url, type } = await req.json();

    if (!url || !url.includes('instagram.com')) {
      return NextResponse.json({ error: 'Valid Instagram URL is required.' }, { status: 400 });
    }

    const youtubedl = require('youtube-dl-exec');
    const ext = process.platform === 'win32' ? '.exe' : '';
    const binPath = path.resolve(process.cwd(), `node_modules/youtube-dl-exec/bin/yt-dlp${ext}`);
    const dl = youtubedl.create(binPath);

    // Build custom args for robust Instagram extraction
    const args: any = {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    };

    // Instagram strictly enforces auth cookies for viewing and downloading stories. 
    // This allows the server owner to set process.env.IG_COOKIE to bypass the login wall.
    if (process.env.IG_COOKIE) {
      args.addHeader = [`Cookie: ${process.env.IG_COOKIE}`];
    }

    const videoData = await dl(url, args);

    let extractedUrl = null;
    let title = videoData.title || `Instagram ${type || 'Post'}`;
    let thumbnail = videoData.thumbnail;

    // Instagram stories often return as a playlist array rather than a single direct link
    if (videoData._type === 'playlist' && videoData.entries && videoData.entries.length > 0) {
      const firstEntry = videoData.entries[0];
      extractedUrl = firstEntry.url || (firstEntry.formats ? (firstEntry.formats.find((f: any) => f.url && f.ext === 'mp4')?.url || firstEntry.formats[0]?.url) : null);
      title = firstEntry.title || title;
      thumbnail = firstEntry.thumbnail || thumbnail;
    } else {
      extractedUrl = videoData.url || (videoData.formats ? (videoData.formats.find((f: any) => f.url && f.ext === 'mp4')?.url || videoData.formats[0]?.url) : null);
    }

    if (!extractedUrl) {
      console.error('No video URL extracted from yt-dlp:', videoData);
      const isStory = url.includes('/stories/');
      const errorMsg = isStory && !process.env.IG_COOKIE 
        ? 'Could not extract Story. Instagram requires an account cookie to download stories. Set IG_COOKIE in your .env file.'
        : 'Could not extract video URL. The reel/story might be private or blocked by Instagram.';
        
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      videoUrl: extractedUrl,
      thumbnail: thumbnail,
      title: title,
    });

  } catch (error: any) {
    console.error('Instagram Download error:', error);
    return NextResponse.json({ 
      error: 'Failed to process the Instagram link. It might be private or Instagram rate-limited the server.' 
    }, { status: 500 });
  }
}
