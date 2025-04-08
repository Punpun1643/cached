import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Copy, MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectUrl, StatusEnum } from '@/lib/db/schema';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { IconButton } from '@/components/ui/icon-button';
import {
  fetchUniqueTags,
  handleDeleteUrl,
  handleUpdateUrlStatus,
  handleUpdateUrlTag
} from '@/lib/actions';
import { ToggleableBadge } from '@/components/ui/toggleable-badge';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';

export function UrlRow({ url }: { url: SelectUrl }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handlers
  const handleClick = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url.address);
        window.alert('Url is copied!'); // TODO: nice dialog alert
      } catch (err) {
        window.alert(`Cannot copy address ${err}`);
      }
    } else {
      window.alert(`Cannot copy address`);
    }
  };

  const handleDeleteUrlWithId = () => {
    mutation.mutate();
  };

  // Queries
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['uniqueTags'],
    queryFn: () => fetchUniqueTags()
  });

  // Mutations
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleDeleteUrl.bind(null, url.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['uniqueTags'] });
    }
  });

  const createUrlWithParams = () => {
    const params = new URLSearchParams(searchParams);
    params.set('url', url.address);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-2">
          <Link
            href={createUrlWithParams()}
            className="text-blue-600 underline decoration-sky-500 visited:text-zinc-500 visited:decoration-gray-500"
            scroll={false}
          >
            {url.title}
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton variant="ghost" icon={Copy} onClick={handleClick} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy URL</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
      <TableCell>
        <ToggleableBadge
          url={url}
          options={StatusEnum.options}
          onValueChange={handleUpdateUrlStatus}
          placeholder={url.status}
        />
      </TableCell>
      <TableCell className="hidden md:table-cell capitalize">
        <ToggleableBadge
          url={url}
          options={data?.map(({ tag }) => tag) || []}
          onValueChange={handleUpdateUrlTag}
          placeholder={url.tag as string}
        />
      </TableCell>
      <TableCell className="hidden md:table-cell">{url.dateAdded}</TableCell>
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
              <form action={handleDeleteUrlWithId}>
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
