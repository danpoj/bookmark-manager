import { NextRequest, NextResponse } from 'next/server';

// get title from url
// e.g.
// input) https://toss.tech/article/llm-serving
// output) LLM 쉽고 빠르게 서빙하기

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) throw new Error('url searchParams missed.');

  try {
    const title = await fetch(url)
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
