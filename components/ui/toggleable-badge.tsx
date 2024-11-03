import { 
  Select, 
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SelectUrl } from "@/lib/db/schema" 

interface IToggleableBadge<T, U extends string> {
  url: T,
  options: string[],
  onValueChange: (id: SelectUrl["id"], newValue: U) => Promise<void>,
}

const ToggleableBadge = <T extends SelectUrl, U extends string>({ url, options, onValueChange }: IToggleableBadge<T, U>) => {
  const handleUpdateUrlOption = async (newStatus: U) => {
     await onValueChange(url.id, newStatus)
  }

  return (
    <Select onValueChange={handleUpdateUrlOption}>
      <SelectTrigger>
        <Badge variant="outline" className="capitalize cursor-pointer">
          <SelectValue placeholder={url.status} />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// const ToggleableBadge = ({ url }: { url : SelectUrl }) => {
//   const handleUpdateUrlWithIdAndStatus = async (newStatus: StatusEnum) => {
//      await handleUpdateUrlStatus(url.id, newStatus)
//   }
//
//   return (
//     <Select onValueChange={handleUpdateUrlWithIdAndStatus}>
//       <SelectTrigger>
//         <Badge variant="outline" className="capitalize cursor-pointer">
//           <SelectValue placeholder={url.status} />
//         </Badge>
//       </SelectTrigger>
//       <SelectContent>
//         {StatusEnum.options.map((option) => (
//           <SelectItem key={option} value={option}>
//             {option}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   )
// }

export { ToggleableBadge }
