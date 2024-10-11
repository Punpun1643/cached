'use client'

import { IconButton } from "@/components/ui/icon-button"
import { handleAddUrl } from "@/lib/actions"
import { PlusCircle } from "lucide-react"

const AddUrlButton = () => {
  const handleClick = async () => {
    try {
      await handleAddUrl()
      alert("URL added successfully!")
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to add URL", error)
      } else {
        console.error("Unknown error occured")
      }
    }
  }
  return (
    <IconButton
      onClick={handleClick} 
      icon={PlusCircle} 
      buttonText="Add URL"/>
  )
}

export default AddUrlButton
