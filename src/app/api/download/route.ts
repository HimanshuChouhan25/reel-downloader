import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || !url.includes('instagram.com')) {
      return NextResponse.json({ error: 'Valid Instagram URL is required.' }, { status: 400 });
    }

    // We only want the direct video URL
    const youtubedl = require('youtube-dl-exec');
    const path = require('path');
    const ext = process.platform === 'win32' ? '.exe' : '';
    const binPath = path.resolve(process.cwd(), `node_modules/youtube-dl-exec/bin/yt-dlp${ext}`);
    const dl = youtubedl.create(binPath);
    
    const videoData = await dl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    });

    const extractedUrl = videoData.url || (videoData.formats ? (videoData.formats.find((f: any) => f.url && f.ext === 'mp4')?.url || videoData.formats[0]?.url) : null);

    if (!extractedUrl) {
      console.error('No video URL extracted from yt-dlp:', videoData);
      return NextResponse.json({ error: 'Could not extract video URL. The reel might be private or not downloadable.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      videoUrl: extractedUrl,
      thumbnail: videoData.thumbnail,
      title: videoData.title || 'Instagram Reel',
    });

  } catch (error: any) {
    console.error('Download error:', error);
    return NextResponse.json({ 
      error: 'Failed to extract video. The reel might be private or Instagram rate-limited the server.' 
    }, { status: 500 });
  }
}
