import 'server-only'

import { db } from '@/lib/db/db'
import { Url, urls } from './schema'
import { count } from 'drizzle-orm';

export const getUrls = async (
  search: string,
  offset: number
): Promise<{
  urls: Url[]; 
  newOffset: number | null; 
  totalUrls: number;
}> => {
  // TODO: implement search functionality
  
  if (offset == null) {
    return {
      urls: [],
      newOffset: null,
      totalUrls: 0 
    }
  }

  let totalUrls = await db.select({ value: count() }).from(urls)
  let fetchedUrls = await db.select().from(urls).limit(5).offset(offset)
 
  // let newOffset = offset + fetchedUrls.length >= totalUrls[0].value 
  //   ? null 
  //   : offset + fetchedUrls.length

  let newOffset = fetchedUrls.length >= 5 ? offset + 5 : null
  return {
    urls: fetchedUrls,
    newOffset: newOffset,
    totalUrls: totalUrls[0].value
  }
}

export const getUrlById = async () => {}

export const deleteUrlById = async () => {}

