
'use server'

import { addUrl } from "./db/queries"
import { InsertUrl } from "./db/schema";

export async function handleAddUrl() {
  const urlData: InsertUrl = {
    id: 102, // Ensure this is a plain number
    title: "just testing", // Plain string
    status: "pending", // Plain string
    tag: "DB", // Plain string
    address: "www.google.com", // Plain string
    dateAdded: new Date().toLocaleString() // Use string representation for date
  };

  await addUrl(urlData);  
}
