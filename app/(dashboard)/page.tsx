import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UrlsTable } from './urls-table';
// import { getProducts } from '@/lib/db';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  // const { products, newOffset, totalProducts } = await getProducts(
  //   search,
  //   Number(offset)
  // );

  type SelectProduct = {
    id: string;
    imageUrl: string;
    name: string;
    status: string;
    price: number;
    stock: number;
    availableAt: Date;
  };

  const urls: SelectProduct[] = [
    {
      id: '5',
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/laptop-9bgUhjY491hkxiMDeSgqb9R5I3lHNL.webp',
      name: 'Gaming Laptop Pro',
      status: 'active',
      price: 1299.0,
      stock: 75,
      availableAt: new Date()
    }
  ];

  const newOffset = 1;
  const totalUrls = 1;

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
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add URL
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <UrlsTable urls={urls} offset={newOffset ?? 0} totalUrls={totalUrls} />
      </TabsContent>
    </Tabs>
  );
}
