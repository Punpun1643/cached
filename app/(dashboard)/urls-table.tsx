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
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { UrlRow } from './url-row';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Link2 } from 'lucide-react';
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
  let searchParams = useSearchParams()
  const pathName = usePathname()
  const params = new URLSearchParams(searchParams)
  let searchValue = searchParams.get("query")

  function prevPage() {
    router.back();
  }

  function nextPage() {
    if (searchValue) { // there is an ongoing query
      params.set("query", searchValue)
    }

    params.set("offset", offset.toString())
    router.push(`${pathName}?${params.toString()}`, { scroll: false })
  }

  return (
    <Card className="border-border/40 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">URLs</CardTitle>
            <p className="text-sm text-muted-foreground">
              {totalUrls} {totalUrls === 1 ? 'link' : 'links'} saved
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Link2 className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">Title</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">Status</TableHead>
              <TableHead className="hidden md:table-cell text-xs font-medium uppercase tracking-wider text-muted-foreground/70">Tag</TableHead>
              <TableHead className="hidden md:table-cell text-xs font-medium uppercase tracking-wider text-muted-foreground/70">Created</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <td colSpan={5} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Link2 className="h-8 w-8 opacity-40" />
                    <p className="text-sm">No URLs found</p>
                  </div>
                </td>
              </TableRow>
            ) : (
              urls.map((url) => (
                <UrlRow key={url.id} url={url} />
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 px-6 py-3">
        <form className="flex items-center w-full justify-between">
          <p className="text-xs text-muted-foreground tabular-nums">
            Showing{' '}
            <span className="font-medium text-foreground">
              {totalUrls < MAX_URL_PER_PAGE
                ? `${totalUrls === 0 ? 0 : 1}-${totalUrls}`
                : offset === totalUrls
                ? `${
                    offset -
                    (totalUrls % MAX_URL_PER_PAGE === 0
                      ? MAX_URL_PER_PAGE
                      : totalUrls % MAX_URL_PER_PAGE) +
                    1
                  }-${totalUrls}`
                : `${offset - MAX_URL_PER_PAGE + 1}-${offset}`}
            </span>{' '}
            of <span className="font-medium text-foreground">{totalUrls}</span>
          </p>
          <div className="flex gap-1">
            <Button
              formAction={prevPage}
              variant="outline"
              size="sm"
              type="submit"
              disabled={offset <= MAX_URL_PER_PAGE}
              className="h-7 px-2.5 text-xs"
            >
              <ChevronLeft className="mr-1 h-3.5 w-3.5" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="outline"
              size="sm"
              type="submit"
              disabled={offset === totalUrls || totalUrls === 0}
              className="h-7 px-2.5 text-xs"
            >
              Next
              <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
