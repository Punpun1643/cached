'use server'

import { revalidatePath } from "next/cache"
import { addUrl } from "./db/queries"
import { InsertUrl } from "./db/schema"
import * as cheerio from 'cheerio'

export async function handleAddUrl(address: string, tag: string) {
  const $ = await cheerio.fromURL(address)
  const addressTitle = $('title').text() || ""
  

  const urlData: Omit<InsertUrl, "id"> = {
    title: addressTitle, // Plain string // TODO: automatically obtain title using metadata
    status: "pending", // Plain string
    tag: tag, // Plain string
    address: address, // Plain string
    dateAdded: new Date().toLocaleString() // Use string representation for date
  };

  await addUrl(urlData);  
  revalidatePath("/")
}
