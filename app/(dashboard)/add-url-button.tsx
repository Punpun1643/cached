'use client'

import { handleAddUrl } from "@/lib/actions"
import { DialogButton } from "@/components/ui/icon-button"
import { PlusCircle } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const AddUrlButton = () => {

  // const handleClick = async (url: string, tag: string) => {
  //   try {
  //     await handleAddUrl(url, tag)
  //     alert("URL added successfully!")  // TODO: nice UI for this
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       console.error("Failed to add URL", error)
  //     } else {
  //       console.error("Unknown error occured")
  //     }
  //   }
  // }
  const handleClick = (url: string, tag: string) => {
    mutation.mutate({ url, tag })
  }

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ url, tag }: { url: string, tag: string }) => handleAddUrl(url, tag), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uniqueTags"] }) 
      alert("Url added successfully!")
    }
  })
  return (
    <DialogButton onClick={handleClick} icon={PlusCircle} buttonText="Add URL" buttonSubmitText="Submit"/>
  )
}

export default AddUrlButton
