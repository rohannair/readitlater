import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  AArrowUpIcon,
  ArrowDownWideNarrowIcon,
  ClockIcon,
  FilterIcon,
  FolderIcon,
  ListOrderedIcon,
  StarIcon,
} from 'lucide-react'

export const LinkListActions = () => {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <FolderIcon className="h-4 w-4 mr-2" />
            By Folder
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ClockIcon className="h-4 w-4 mr-2" />
            By Date Added
          </DropdownMenuItem>
          <DropdownMenuItem>
            <StarIcon className="h-4 w-4 mr-2" />
            By Popularity
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <ListOrderedIcon className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <AArrowUpIcon className="h-4 w-4 mr-2" />
            Ascending
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowDownWideNarrowIcon className="h-4 w-4 mr-2" />
            Descending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
