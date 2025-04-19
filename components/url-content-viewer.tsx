'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card';

import DOMPurify from 'dompurify';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function UrlContentViewer({ url }: { url: string }) {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('url');

    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/fetch-url-content?url=${encodeURIComponent(url)}`
        ); // fetch through server api
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();

        const sanitizedContent = DOMPurify.sanitize(data.content, {
          ALLOWED_TAGS: [
            'p',
            'a',
            'b',
            'i',
            'em',
            'strong',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'ul',
            'ol',
            'li',
            'br',
            'div',
            'span',
            'img',
            'article',
            'section'
          ],
          ALLOWED_ATTR: ['href', 'src', 'class', 'id', 'alt', 'title'],
          FORBID_TAGS: ['style', 'script'],
          ADD_TAGS: ['iframe'],
          ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
        });

        setContent(sanitizedContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };
    if (url) {
      fetchContent();
    }
  }, [url]);

  return (
    <Card className="h-full relative flex flex-col overflow-hidden">
      <CardHeader className="relative pb-2">
        <div className="absolute top-2 right-2">
          <Button
            onClick={handleClose}
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            aria-label="Close content viewer"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardTitle className="text-lg font-medium pr-10">
          This is the url viewer
        </CardTitle>
        <CardDescription>https://google.com</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {isLoading && <div>Loading content...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {content && (
          <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none overflow-x-auto">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
