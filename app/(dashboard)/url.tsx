import Image from 'next/image';
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
// import { SelectProduct } from '@/lib/db'
import { deleteProduct } from './actions';

type Url = {
  id: string;
  imageUrl: string;
  name: string;
  status: string;
  price: number;
  stock: number;
  availableAt: Date;
};

export function Url({ url }: { url: Url }) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={url.imageUrl}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{url.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {url.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{url.stock}</TableCell>
      <TableCell className="hidden md:table-cell">
        {url.availableAt.toLocaleDateString('en-US')}
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
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
