'use client';

import { useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/icons';
import { Search } from 'lucide-react';

export function SearchInput() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams()
  const pathname = usePathname()

  function searchAction(formData: FormData) {
    let searchValue = formData.get('query') as string;
    const params = new URLSearchParams(searchParams)

    if (searchValue) {
      params.set('query', searchValue)
      params.delete('offset') // clears out any offset for each new search attempt
    } else {
      params.delete('query')
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`); });
  }

  return (
    <form action={searchAction} className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
      <Input
        name="query"
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        defaultValue={searchParams.get("query")?.toString()}
      />
      {isPending && <Spinner />}
    </form>
  );
}
