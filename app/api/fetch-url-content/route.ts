import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
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
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; URLStorer/1.0)',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch: ${response.status} ${response.statusText}`
        },
        { status: 502 }
      );
    }

    const html = await response.text();

    const $ = cheerio.load(html);

    // Fix relative urls for images, scripts, and links
    const urlObj = new URL(url);
    const baseUrl = `${urlObj.protocol}//${urlObj.host}`;

    // Fix relative image src
    $('img').each((_, el) => {
      const src = $(el).attr('src');
      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        const absoluteSrc = src.startsWith('/')
          ? `${baseUrl}${src}`
          : `${baseUrl}/${src}`;

        $(el).attr('src', absoluteSrc);
      }

      $(el).attr('loading', 'lazy');
      $(el).attr('style', 'max-width: 100%; height: auto;');
    });

    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        const absoluteHref = href.startsWith('/')
          ? `${baseUrl}${href}`
          : `${baseUrl}/${href}`;

        $(el).attr('href', absoluteHref);
      }

      $(el).attr('target', '_blank');
      $(el).attr('rel', 'noopener noreferrer');
    });

    // Handle code blocks
    $('pre, code').each((_, el) => {
      $(el).addClass(
        'whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 rounded p-2 overflow-x-auto'
      );
    });

    // Remove scripts for security
    $('script').remove();

    const processedHtml = $.html();
    return NextResponse.json(
      {
        content: processedHtml,
        title: $('title').text() || url,
        baseUrl
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    // undici in Next.js 15 throws ResponseStatusCodeError for non-2xx responses
    if (err instanceof Error && 'statusCode' in err) {
      const statusCode = (err as { statusCode: number }).statusCode;
      return NextResponse.json(
        {
          error: `The site returned ${statusCode}. It may block external requests.`
        },
        { status: 502 }
      );
    }

    console.error('Error fetching content:', err);
    return NextResponse.json(
      {
        error: 'Failed to fetch content'
      },
      { status: 500 }
    );
  }
}
