import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { LinkListActions } from '@/components/LinkList/LinkListActions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { cn, createPaginationQueryString } from '@/lib/utils'
import type { LinkStatus } from '@/components/StatusIcon/StatusIcon'
import { LinkItems } from '@/components/LinkList/LinkItems'

interface ILink {
  id: string
  title: string
  url: string
  imageUrl?: string
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
  links: ILink[]
  pagination: IPagination
}

const getPaginationUrl = createPaginationQueryString('/bookmarks')

export async function LinkList({ links, pagination }: LinkListProps) {
  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i)
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
              <LinkItems links={links} />
            </div>
          </div>
        </main>
        {/* <LinkDrawer /> */}
        <aside className="flex my-4 mx-auto w-full justify-center">
          <Pagination>
            <PaginationContent>
              {pagination.page - 1 > 0 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={getPaginationUrl({
                      page: (pagination.page - 1).toString(),
                    })}
                  >
                    Previous
                  </PaginationPrevious>
                </PaginationItem>
              )}
              {/* @ts-ignore */}
              {pages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={getPaginationUrl({
                      page: (page + 1).toString(),
                    })}
                    className={cn('p-2 rounded-md', {
                      'bg-foreground/10': page + 1 === pagination.page,
                    })}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {pagination.page < pagination.totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href={getPaginationUrl({
                      page: (pagination.page + 1).toString(),
                    })}
                  >
                    Previous
                  </PaginationNext>
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </aside>
      </div>
    </div>
  )
}
