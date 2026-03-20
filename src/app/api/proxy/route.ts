import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url || url === 'undefined') {
    return new NextResponse('Missing or invalid URL', { status: 400 });
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch media');

    return new NextResponse(res.body, {
      headers: {
        'Content-Type': res.headers.get('content-type') || 'video/mp4',
        'Content-Disposition': 'attachment; filename="instagram_reel.mp4"',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
