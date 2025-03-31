import { UrlsTable } from 'app/(dashboard)/urls-table';
import { getUrls } from '@/lib/db/queries';
import { TabsContent } from './ui/tabs';

export async function TabContent({
  searchValue,
  offset,
  status
}: {
  searchValue: string;
  offset: number;
  status: string;
}) {
  const { urls, newOffset, totalUrls } = await getUrls(
    searchValue,
    offset,
    status
  );

  return (
    <>
      <TabsContent value="all">
        <UrlsTable urls={urls} offset={newOffset ?? 0} totalUrls={totalUrls} />
      </TabsContent>
      <TabsContent value="pending">
        <UrlsTable urls={urls} offset={newOffset ?? 0} totalUrls={totalUrls} />
      </TabsContent>
      <TabsContent value="read">
        <UrlsTable urls={urls} offset={newOffset ?? 0} totalUrls={totalUrls} />
      </TabsContent>
      <TabsContent value="archived">
        <UrlsTable urls={urls} offset={newOffset ?? 0} totalUrls={totalUrls} />
      </TabsContent>
    </>
  );
}
