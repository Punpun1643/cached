import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UrlsTable } from './urls-table';
import { getUrls } from '@/lib/db/queries';
import AddUrlButton from './add-url-button';
import { Suspense } from 'react';
import router from 'next/router';
import { UrlTabs } from '@/components/url-tabs';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { query: string; offset: string; status: string };
}) {
  const searchValue = searchParams.query ?? '';
  const offset = Number(searchParams.offset) || 0;
  const status = searchParams.status ?? 'all';
  const { urls, newOffset, totalUrls } = await getUrls(
    searchValue,
    offset,
    status
  );

  return (
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
      <TabsContent value="all">
        <Suspense>
          <UrlsTable
            urls={urls}
            offset={newOffset ?? 0}
            totalUrls={totalUrls}
          />
        </Suspense>
      </TabsContent>
      <TabsContent value="pending">
        <Suspense>
          <UrlsTable
            urls={urls}
            offset={newOffset ?? 0}
            totalUrls={totalUrls}
          />
        </Suspense>
      </TabsContent>
      <TabsContent value="read">
        <Suspense>
          <UrlsTable
            urls={urls}
            offset={newOffset ?? 0}
            totalUrls={totalUrls}
          />
        </Suspense>
      </TabsContent>
      <TabsContent value="archived">
        <Suspense>
          <UrlsTable
            urls={urls}
            offset={newOffset ?? 0}
            totalUrls={totalUrls}
          />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
