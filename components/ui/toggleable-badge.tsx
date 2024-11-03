import { Select, SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SelectUrl, StatusEnum } from "@/lib/db/schema" 

const ToggleableBadge = ({ url }: { url : SelectUrl }) => {
  return (
    <div>
    <Select>
      <SelectTrigger>
        <Badge variant="outline" className="capitalize cursor-pointer">
          <SelectValue placeholder={url.status} />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {StatusEnum.options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    </div>
  )
}

export { ToggleableBadge }
