import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const searchParams = new URLSearchParams(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      {
        error: 'URL is required'
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    return NextResponse.json(
      {
        content: html // TODO: proper parsing
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: 'Failed to fetch content'
      },
      { status: 500 }
    );
  }
}
