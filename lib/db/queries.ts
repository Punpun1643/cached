import 'server-only';

import { db } from '@/lib/db/db';
import { InsertUrl, SelectUrl, StatusEnum, urls } from './schema';
import { asc, count, eq, ilike, or } from 'drizzle-orm';
import { MAX_URL_PER_PAGE } from '../constants';

export const getUrls = async (
  searchParam: string,
  offset: number
): Promise<{
  urls: SelectUrl[];
  newOffset: number | null;
  totalUrls: number;
}> => {
 
  let fetchedUrls
  let totalUrls

  const isSearchableTag = StatusEnum.options.some((status) => status === searchParam.toLowerCase())
  if (searchParam) {
    if (isSearchableTag) {
        totalUrls = await db.select({ value: count() })
                            .from(urls)
                            .where(
                              or(
                                eq(urls.tag, searchParam.toLowerCase()), 
                                ilike(urls.title, `%${searchParam}%`),
                                eq(urls.status, searchParam.toLowerCase() as StatusEnum)
                              )
                            )
        fetchedUrls = await db.select()
                              .from(urls)
                              .where(
                                or(
                                  eq(urls.tag, searchParam),
                                  ilike(urls.title, `%${searchParam}%`),
                                  eq(urls.status, searchParam.toLowerCase() as StatusEnum)
                                )
                              )
                              .orderBy(asc(urls.id))
                              .limit(MAX_URL_PER_PAGE)
                              .offset(offset)
    } else {
      totalUrls = await db.select({ value: count() })
                        .from(urls)
                        .where(
                          or(
                            eq(urls.tag, searchParam.toLowerCase()), 
                            ilike(urls.title, `%${searchParam}%`)
                          )
                        )

      fetchedUrls = await db.select()
                              .from(urls)
                              .where(
                                or(
                                  eq(urls.tag, searchParam),
                                  ilike(urls.title, `%${searchParam}%`)
                                )
                              )
                              .orderBy(asc(urls.id))
                              .limit(MAX_URL_PER_PAGE)
                              .offset(offset)
    }

  } else {
    totalUrls = await db.select({ value: count() }).from(urls);
    fetchedUrls = await db.select()
                        .from(urls)
                        .orderBy(asc(urls.id))
                        .limit(MAX_URL_PER_PAGE)
                        .offset(offset);
  }

  let newOffset = null
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

export const updateUrlTag = async (urlId: SelectUrl["id"], tag: Pick<SelectUrl, "tag">) => {
  await db.update(urls).set(tag).where(eq(urls.id, urlId))
}

export const updateUrlStatus = async (urlId: SelectUrl["id"], status: Pick<SelectUrl, "status">) => {
  await db.update(urls).set(status).where(eq(urls.id, urlId))
}

export const deleteUrlById = async (id: SelectUrl["id"]) => {
  await db.delete(urls).where(eq(urls.id, id))
};

export const getUniqueTags = async (): Promise<{ tag: string }[]> => {
  return await db.selectDistinct({ tag: urls.tag }).from(urls).orderBy(urls.tag)
}
