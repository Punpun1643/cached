'use server'

import { revalidatePath } from "next/cache"
import { addUrl, deleteUrlById, getUniqueTags, updateUrlStatus, updateUrlTag } from "./db/queries"
import { InsertUrl, SelectUrl, StatusEnum } from "./db/schema"
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


export async function handleDeleteUrl(id: SelectUrl["id"]) {
  await deleteUrlById(id)
  revalidatePath("/")
}

export const handleUpdateUrlStatus = async (id: SelectUrl["id"], status: StatusEnum) => {
  const updateData: Pick<SelectUrl, "status"> = {
    status: status
  }

  await updateUrlStatus(id, updateData) 
}

export const handleUpdateUrlTag = async (id: SelectUrl["id"], tag: string) => {
  const updateData: Pick<SelectUrl, "tag"> = {
    tag: tag
  }

  await updateUrlTag(id, updateData)
}

export const fetchUniqueTags = async (): Promise<{ tag: string }[]> => {
  return await getUniqueTags()
}
