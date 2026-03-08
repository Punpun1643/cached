import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Copy, MoreHorizontal, ExternalLink, Trash2 } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectUrl, StatusEnum } from '@/lib/db/schema';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
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
    <TableRow className="group">
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <Link
            href={createUrlWithParams()}
            className="text-sm text-foreground hover:text-foreground/80 transition-colors line-clamp-1"
            scroll={false}
          >
            {url.title}
          </Link>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground shrink-0"
                  onClick={handleClick}
                >
                  <Copy className="h-3 w-3" />
                </Button>
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
          type="status"
        />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <ToggleableBadge
          url={url}
          options={data?.map(({ tag }) => tag) || []}
          onValueChange={handleUpdateUrlTag}
          placeholder={url.tag as string}
          type="tag"
        />
      </TableCell>
      <TableCell className="hidden md:table-cell text-muted-foreground text-sm tabular-nums">
        {url.dateAdded}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-sm">
              <ExternalLink className="mr-2 h-3.5 w-3.5" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm">
              Archive
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <form action={handleDeleteUrlWithId}>
                <button type="submit" className="flex items-center text-sm text-destructive">
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  Delete
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
