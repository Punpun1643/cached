'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';

interface UrlContentViewerProps {
  url: string;
  title: string;
}

export function UrlContentViewer({ url, title }: UrlContentViewerProps) {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/fetch-url-content?url=${encodeURIComponent(url)}`
        );
        if (!response.ok) throw new Error('Failed to fetch content');
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
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <div>Loading content...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {content && (
          <div
            className="prose max-w-none dark:prose-invert"
            // We'll use this div for highlighting features later
            id="url-content"
          >
            {/* Later we can add proper content parsing and formatting */}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
