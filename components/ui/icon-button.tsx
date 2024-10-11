'use client'

import { LucideIcon, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react';


interface IButtonProps {
  onClick: () => void
  icon?: LucideIcon
  buttonText: string
}

interface IDialogButton {
  onClick: (url: string, tag: string) => void
  icon?: LucideIcon
  buttonText: string
  submitIcon?: LucideIcon
  buttonSubmitText: string
}

const DialogButton = ({ onClick, icon: Icon, buttonText, submitIcon, buttonSubmitText }: IDialogButton) => {
  const [url, setUrl] = useState("")
  const [tag, setTag] = useState("") // TODO: extend to support multiple tags


  const handleSubmit = () => {
    onClick(url, tag)
  }

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
            {Icon && <Icon className="h-3.5 w-3.5" />}
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {buttonText}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add URL</DialogTitle>
            <DialogDescription>
              Add your URL with related attributes here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL address
              </Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag" className="text-right">
                Tag
              </Label>
              <Input
                id="tag"
                placeholder="example"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <IconButton onClick={handleSubmit} icon={submitIcon} buttonText={buttonSubmitText} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}

const IconButton = ({ onClick, icon: Icon, buttonText }: IButtonProps) => {
  return (
    <Button size="sm" className="h-8 gap-1" onClick={onClick}>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        {buttonText}
      </span>
    </Button>
  )
}


export { IconButton, DialogButton }
