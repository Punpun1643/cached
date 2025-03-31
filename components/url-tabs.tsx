'use client';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, useSearchParams } from 'next/navigation';

export function UrlTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('status', value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <TabsList>
      <TabsTrigger value="all" onClick={() => handleTabChange('all')}>
        All
      </TabsTrigger>
      <TabsTrigger value="pending" onClick={() => handleTabChange('pending')}>
        Pending
      </TabsTrigger>
      <TabsTrigger value="read" onClick={() => handleTabChange('read')}>
        Read
      </TabsTrigger>
      <TabsTrigger
        value="archived"
        onClick={() => handleTabChange('archived')}
        className="hidden sm:flex"
      >
        Archived
      </TabsTrigger>
    </TabsList>
  );
}
