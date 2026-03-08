'use client'

import { handleAddUrl } from "@/lib/actions"
import { DialogButton } from "@/components/ui/icon-button"
import { Plus } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const AddUrlButton = () => {

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ url, tag }: { url: string, tag: string }) => handleAddUrl(url, tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uniqueTags"] })
      alert("Url added successfully!")
    }
  })

  const handleClick = (url: string, tag: string) => {
    mutation.mutate({ url, tag })
  }

  return (
    <DialogButton onClick={handleClick} icon={Plus} buttonText="Add URL" buttonSubmitText="Save"/>
  )
}

export default AddUrlButton