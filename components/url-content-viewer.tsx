'use client';

import { useEffect, useState, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card';

import { sanitize } from 'dompurify';

export function UrlContentViewer({ url }: { url: string }) {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
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
    <Card>
      <CardHeader>
        <CardTitle>This is the url viewer</CardTitle>
        <CardDescription>https://google.com</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <div>Loading content...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {content && (
          <div>
            <div dangerouslySetInnerHTML={{ __html: sanitize(content) }}></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
