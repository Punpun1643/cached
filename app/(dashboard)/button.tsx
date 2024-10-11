'use client'

import { LucideIcon, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { handleAddUrl } from '@/lib/actions';
import Error from 'next/error';

interface IButtonProps {
  buttonText: string
}

const IconButton = ({ buttonText }: IButtonProps) => {
  const handleClick = async () => {
    try {
      await handleAddUrl()
      alert("URL added successfully!")
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to add URL", error)
      } else {
        console.error("Unknown error occured", error.error)
      }
    }
  }
  return (
    <Button size="sm" className="h-8 gap-1" onClick={handleClick}>
      <PlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          {buttonText}
        </span>
    </Button>
  )
}


export default IconButton
