'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
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
  buttonText?: string
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
  asChild?: boolean
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
    setUrl("")
    setTag("")
  }

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1.5 text-xs font-medium">
            {Icon && <Icon className="h-3.5 w-3.5" />}
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {buttonText}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-base">Add URL</DialogTitle>
            <DialogDescription className="text-sm">
              Add a URL with a tag to organize your links.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="url" className="text-sm font-medium">
                URL
              </Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tag" className="text-sm font-medium">
                Tag
              </Label>
              <Input
                id="tag"
                placeholder="e.g. design, dev, reading"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="sm">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleSubmit} size="sm">
                {buttonSubmitText}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}

const IconButton = React.forwardRef<HTMLButtonElement, IButtonProps>(({
  onClick,
  icon: Icon,
  buttonText,
  variant = "default",
  asChild = false,
  ...props }: IButtonProps, ref) => {
  return (
    <Button
      size="sm"
      className="h-8 gap-1"
      onClick={onClick}
      variant={variant}
      ref={ref}
      {...props}>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        {buttonText}
      </span>
    </Button>
  )
})

IconButton.displayName = "IconButton"

export { IconButton, DialogButton }