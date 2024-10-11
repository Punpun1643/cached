import { LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"

interface IButtonProps {
  onClick: () => Promise<void>
  icon: LucideIcon
  buttonText: string
}

const IconButton = ({ onClick, icon: Icon, buttonText }: IButtonProps) => {
  return (
    <Button size="sm" className="h-8 gap-1" onClick={onClick}>
      <Icon className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          {buttonText}
        </span>
    </Button>
  )
}


export { IconButton }
