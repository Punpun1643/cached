import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UrlsTable } from './urls-table';
import { getUrls } from '@/lib/db/queries';
import AddUrlButton from './add-url-button';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = Number(searchParams.offset) || 0;
  const { urls, newOffset, totalUrls } = await getUrls(
    search,
    offset
  );

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Pending</TabsTrigger>
          <TabsTrigger value="draft">Read</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
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
        <UrlsTable urls={urls} offset={newOffset ?? 0} totalUrls={totalUrls} />
      </TabsContent>
    </Tabs>
  );
}
