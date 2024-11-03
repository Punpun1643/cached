import { Select, SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SelectUrl, StatusEnum } from "@/lib/db/schema" 
import { handleUpdateUrlStatus } from "@/lib/actions"

const ToggleableBadge = ({ url }: { url : SelectUrl }) => {
  const handleUpdateUrlWithIdAndStatus = async (newStatus: StatusEnum) => {
     await handleUpdateUrlStatus(url.id, newStatus)
  }
  return (
    <Select onValueChange={handleUpdateUrlWithIdAndStatus}>
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
  )
}

export { ToggleableBadge }
