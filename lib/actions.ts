'use server'

import { addUrl } from "./db/queries"
import { InsertUrl } from "./db/schema";

export async function handleAddUrl(address: string, tag: string) {
  const urlData: Omit<InsertUrl, "id"> = {
    title: "just testing", // Plain string // TODO: automatically obtain title using metadata
    status: "pending", // Plain string
    tag: tag, // Plain string
    address: address, // Plain string
    dateAdded: new Date().toLocaleString() // Use string representation for date
  };

  await addUrl(urlData);  
}
