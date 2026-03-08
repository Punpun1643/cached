import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SelectUrl } from "@/lib/db/schema"
import type { BadgeProps } from "@/components/ui/badge"

interface IToggleableBadge<T, U extends string> {
  url: T,
  options: U[],
  onValueChange: (id: SelectUrl["id"], newValue: U) => Promise<void>,
  placeholder?: U,
  type?: "status" | "tag"
}

function getStatusVariant(status: string): BadgeProps["variant"] {
  switch (status) {
    case "pending": return "pending"
    case "read": return "read"
    case "archived": return "archived"
    default: return "secondary"
  }
}

const ToggleableBadge = <T extends SelectUrl, U extends string>({ url, options, onValueChange, placeholder, type = "status" }: IToggleableBadge<T, U>) => {
  const handleUpdateUrlOption = async (newOption: U) => {
     await onValueChange(url.id, newOption)
  }

  const variant = type === "status"
    ? getStatusVariant(placeholder || "")
    : "tag"

  return (
    <Select onValueChange={handleUpdateUrlOption}>
      <SelectTrigger className="border-0 bg-transparent h-auto w-auto p-0 shadow-none focus:ring-0 focus:ring-offset-0 [&>svg]:hidden">
        <Badge variant={variant} className="capitalize cursor-pointer hover:opacity-80 transition-opacity">
          <SelectValue placeholder={placeholder || ""} />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option} className="capitalize">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { ToggleableBadge }
