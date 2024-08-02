import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { LinkListActions } from '@/components/LinkList/LinkListActions'
import { LinkListItem } from '@/components/LinkList/LinkListItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { createPaginationQueryString } from '@/lib/utils'
import type { LinkStatus } from '@/components/StatusIcon/StatusIcon'

interface Link {
  id: string
  title: string
  url: string
  summary: string
  status: LinkStatus
  tags: { key: string; label: string }[]
  createdAt: string
}

interface IPagination {
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

interface LinkListProps {
  links: Link[]
  pagination: IPagination
}

const getPaginationUrl = createPaginationQueryString('/bookmarks')

export async function LinkList({ links, pagination }: LinkListProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Bookmarks</h1>
            <LinkListActions />
          </div>
          <div className="flex items-center mb-4">
            <Input
              type="search"
              placeholder="Search bookmarks..."
              className="flex-1 max-w-md"
            />
            <Button className="ml-2">
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          <div className="grid gap-4">
            <div className="space-y-4">
              {links.map((link) => (
                <LinkListItem
                  key={link.id}
                  href={`/bookmarks/${link.id}`}
                  title={link.title}
                  url={link.url}
                  summary={link.summary}
                  tags={link.tags}
                  createdAt={link.createdAt}
                  status={link.status}
                />
              ))}
            </div>
          </div>
        </main>

        <aside className="flex my-4 mx-auto w-full justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={getPaginationUrl({
                    page: (pagination.page - 1).toString(),
                  })}
                >
                  Previous
                </PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={getPaginationUrl({
                    page: (pagination.page + 1).toString(),
                  })}
                >
                  Previous
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </aside>
      </div>
    </div>
  )
}
