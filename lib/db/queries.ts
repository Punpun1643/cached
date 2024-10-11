import 'server-only'

import { db } from '@/lib/db/db'
import { InsertUrl, Url, urls } from './schema'
import { count } from 'drizzle-orm';
import { MAX_URL_PER_PAGE } from '../constants';
import { UrlObject } from 'url';

export const getUrls = async (
  search: string,
  offset: number
): Promise<{
  urls: Url[]; 
  newOffset: number | null; 
  totalUrls: number;
}> => {
  // TODO: implement search functionality
 
  let totalUrls = await db.select({ value: count() }).from(urls)
  let fetchedUrls = await db.select().from(urls)
    .limit(MAX_URL_PER_PAGE)
    .offset(offset)
 
  let newOffset = null;
  if (fetchedUrls.length === MAX_URL_PER_PAGE) {
    newOffset = offset + MAX_URL_PER_PAGE
  } else if (fetchedUrls.length < MAX_URL_PER_PAGE) {
    newOffset = offset + fetchedUrls.length;
  }
  return {
    urls: fetchedUrls,
    newOffset: newOffset,
    totalUrls: totalUrls[0].value
  }
}

export const addUrl = async ({ id, title, status, tag, address, dateAdded }: InsertUrl) => {
  await db.insert(urls).values({
    id: id,
    title: title, 
    status: status,
    tag: tag,
    address: address,
    dateAdded: dateAdded
  }).returning() 
}

export const getUrlById = async () => {}

export const deleteUrlById = async () => {}

