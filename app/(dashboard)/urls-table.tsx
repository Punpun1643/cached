'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { UrlRow } from './url-row';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SelectUrl } from '@/lib/db/schema';
import { MAX_URL_PER_PAGE } from '@/lib/constants';

export function UrlsTable({
  urls,
  offset,
  totalUrls: totalUrls
}: {
  urls: SelectUrl[];
  offset: number;
  totalUrls: number;
}) {
  let router = useRouter();

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your current URLs</CardTitle>
        <CardDescription>
          These are the current URLs in your list
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Tag</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.map((url) => (
              <UrlRow key={url.id} url={url} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {totalUrls < MAX_URL_PER_PAGE
                ? `1-${totalUrls}`
                : offset === totalUrls
                ? `${
                    offset -
                    (totalUrls % MAX_URL_PER_PAGE === 0
                      ? MAX_URL_PER_PAGE
                      : totalUrls % MAX_URL_PER_PAGE) +
                    1
                  }-${totalUrls}`
                : `${offset - MAX_URL_PER_PAGE + 1}-${offset}`}
            </strong>{' '}
            of <strong>{totalUrls}</strong> urls
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset <= MAX_URL_PER_PAGE}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === totalUrls}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
