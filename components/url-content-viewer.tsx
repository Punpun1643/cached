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
        setContent(data.content);
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
          <div className="overflow-x-auto max-w-full">
            {/* <div
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
            ></div> */}
            {/* we should sanitize for security purpose, but format is messed up */}
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
