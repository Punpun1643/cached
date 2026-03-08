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
import { ExternalLink, Loader2, X } from 'lucide-react';
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
    <Card className="h-full relative flex flex-col overflow-hidden border-border/40 shadow-sm">
      <CardHeader className="relative pb-3 border-b bg-muted/20">
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <Button
            onClick={() => window.open(url, '_blank')}
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            aria-label="Open in new tab"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
          <Button
            onClick={handleClose}
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            aria-label="Close content viewer"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
        <CardTitle className="text-sm font-medium pr-20">{}</CardTitle>
        <CardDescription className="text-xs truncate">{url}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-6">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-32 gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading content...</p>
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <p className="text-sm text-destructive">{error}</p>
            <Button variant="outline" size="sm" onClick={() => window.open(url, '_blank')} className="text-xs">
              Open in browser
            </Button>
          </div>
        )}
        {content && (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
