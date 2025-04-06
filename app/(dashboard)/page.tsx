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

export default async function ProductsPage({
  searchParams
}: {
  searchParams: {
    query: string;
    offset: string;
    status: string;
    url: string;
  };
}) {
  const searchValue = searchParams.query ?? '';
  const offset = Number(searchParams.offset) || 0;
  const status = searchParams.status ?? 'all';
  const selectedUrl = searchParams.url;

  const { urls, newOffset, totalUrls } = await getUrls(
    searchValue,
    offset,
    status
  ); // note: when searchParams change, the server component is rerendered, causing getUrls to be re-executed

  return (
    <div>
      <div>
        <Tabs defaultValue="all">
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
            <TabsContent value="all">
              <UrlsTable
                urls={urls}
                offset={newOffset ?? 0}
                totalUrls={totalUrls}
              />
            </TabsContent>
            <TabsContent value="pending">
              <UrlsTable
                urls={urls}
                offset={newOffset ?? 0}
                totalUrls={totalUrls}
              />
            </TabsContent>
            <TabsContent value="read">
              <UrlsTable
                urls={urls}
                offset={newOffset ?? 0}
                totalUrls={totalUrls}
              />
            </TabsContent>
            <TabsContent value="archived">
              <UrlsTable
                urls={urls}
                offset={newOffset ?? 0}
                totalUrls={totalUrls}
              />
            </TabsContent>
          </Suspense>
        </Tabs>
      </div>
      <div>{selectedUrl && <UrlContentViewer url={selectedUrl} />}</div>
    </div>
  );
}
