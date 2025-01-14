import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) throw new Error('url searchParams missed.');

  try {
    const title = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    })
      .then((r) => r.text())
      .then((body) => {
        const match = body.match(/<title([^<]*)>([^<]*)<\/title>/);

        if (!match || typeof match[match.length - 1] !== 'string') {
          return url;
        }

        return match[match.length - 1];
      });

    return NextResponse.json({ title });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ title: url });
  }
};
