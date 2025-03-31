import 'server-only';

import { db } from '@/lib/db/db';
import { InsertUrl, SelectUrl, StatusEnum, urls } from './schema';
import { and, asc, count, eq, ilike, or } from 'drizzle-orm';
import { MAX_URL_PER_PAGE } from '../constants';

export const getUrls = async (
  searchValue: string,
  offset: number,
  status?: string
): Promise<{
  urls: SelectUrl[];
  newOffset: number | null;
  totalUrls: number;
}> => {
  let fetchedUrls;
  let totalUrls;

  // Base query builders
  const baseQuery = db.select().from(urls);
  const countQuery = db.select({ value: count() }).from(urls);

  // Build where conditions
  if (searchValue && status && status !== 'all') {
    // Both search and status filter
    totalUrls = await countQuery.where(
      and(
        eq(urls.status, status.toLowerCase() as StatusEnum),
        or(
          eq(urls.tag, searchValue.toLowerCase()),
          ilike(urls.title, `%${searchValue}%`)
        )
      )
    );

    fetchedUrls = await baseQuery
      .where(
        and(
          eq(urls.status, status.toLowerCase() as StatusEnum),
          or(
            eq(urls.tag, searchValue.toLowerCase()),
            ilike(urls.title, `%${searchValue}%`)
          )
        )
      )
      .orderBy(asc(urls.id))
      .limit(MAX_URL_PER_PAGE)
      .offset(offset);
  } else if (status && status !== 'all') {
    // Only status filter
    totalUrls = await countQuery.where(
      eq(urls.status, status.toLowerCase() as StatusEnum)
    );

    fetchedUrls = await baseQuery
      .where(eq(urls.status, status.toLowerCase() as StatusEnum))
      .orderBy(asc(urls.id))
      .limit(MAX_URL_PER_PAGE)
      .offset(offset);
  } else if (searchValue) {
    // Only search filter
    totalUrls = await countQuery.where(
      or(
        eq(urls.tag, searchValue.toLowerCase()),
        ilike(urls.title, `%${searchValue}%`)
      )
    );

    fetchedUrls = await baseQuery
      .where(
        or(
          eq(urls.tag, searchValue.toLowerCase()),
          ilike(urls.title, `%${searchValue}%`)
        )
      )
      .orderBy(asc(urls.id))
      .limit(MAX_URL_PER_PAGE)
      .offset(offset);
  } else {
    // No filters
    totalUrls = await countQuery;
    fetchedUrls = await baseQuery
      .orderBy(asc(urls.id))
      .limit(MAX_URL_PER_PAGE)
      .offset(offset);
  }
  let newOffset = null;
  if (fetchedUrls.length === MAX_URL_PER_PAGE) {
    newOffset = offset + MAX_URL_PER_PAGE;
  } else if (fetchedUrls.length < MAX_URL_PER_PAGE) {
    newOffset = offset + fetchedUrls.length;
  }

  return {
    urls: fetchedUrls,
    newOffset: newOffset,
    totalUrls: totalUrls[0].value
  };
};

export const addUrl = async ({
  title,
  status,
  tag,
  address,
  dateAdded
}: Omit<InsertUrl, 'id'>) => {
  const insertedUrl = await db
    .insert(urls)
    .values({
      title: title,
      status: status,
      tag: tag,
      address: address,
      dateAdded: dateAdded
    })
    .returning();

  return insertedUrl;
};

export const updateUrlTag = async (
  urlId: SelectUrl['id'],
  tag: Pick<SelectUrl, 'tag'>
) => {
  await db.update(urls).set(tag).where(eq(urls.id, urlId));
};

export const updateUrlStatus = async (
  urlId: SelectUrl['id'],
  status: Pick<SelectUrl, 'status'>
) => {
  await db.update(urls).set(status).where(eq(urls.id, urlId));
};

export const deleteUrlById = async (id: SelectUrl['id']) => {
  await db.delete(urls).where(eq(urls.id, id));
};

export const getUniqueTags = async (): Promise<{ tag: string }[]> => {
  return await db
    .selectDistinct({ tag: urls.tag })
    .from(urls)
    .orderBy(urls.tag);
};
