import { Tabs, TabsContent } from '@/components/ui/tabs';
import { File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UrlsTable } from './urls-table';
import { getUrls } from '@/lib/db/queries';
import AddUrlButton from './add-url-button';
import { Suspense } from 'react';
import { UrlTabs } from '@/components/url-tabs';
import Loading from './loading';
import { UrlContentViewer } from '@/components/url-content-viewer';
import { Card, CardContent } from '@/components/ui/card';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: {
    query: string;
    offset: string;
    status: string;
    selectedUrl?: string;
    title?: string;
  };
}) {
  const searchValue = searchParams.query ?? '';
  const offset = Number(searchParams.offset) || 0;
  const status = searchParams.status ?? 'all';
  const selectedUrl = searchParams.selectedUrl;
  const selectedTitle = searchParams.title;

  const { urls, newOffset, totalUrls } = await getUrls(
    searchValue,
    offset,
    status
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:overflow-auto md:max-h-[calc(100vh-4rem)]">
        <Tabs defaultValue={status}>
          <div className="flex items-center">
            <UrlTabs />
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <AddUrlButton />
            </div>
          </div>
          <Suspense fallback={<Loading />}>
            <TabsContent value={status}>
              <UrlsTable
                urls={urls}
                offset={newOffset ?? 0}
                totalUrls={totalUrls}
              />
            </TabsContent>
          </Suspense>
        </Tabs>
      </div>
      <div className="hidden md:block md:overflow-auto md:max-h-[calc(100vh-4rem)]">
        {selectedUrl ? (
          <UrlContentViewer url={selectedUrl} title={selectedTitle || ''} />
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-full text-muted-foreground">
              Select a URL to view its content
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
``