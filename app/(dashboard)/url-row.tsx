import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { deleteProduct } from './actions';
import { Url } from '@/lib/db/schema';
import Link from 'next/link';

export function UrlRow({ url }: { url: Url }) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link href={url.address} target="_blank" rel="noopener noreferrer">
          {url.title}
        </Link>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {url.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell capitalize">
        <Badge variant="outline" className="capitalize">
          {url.tag}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {url.dateAdded}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteProduct}>
                <button type="submit">
                  <span className="text-red-600">Delete</span>
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
