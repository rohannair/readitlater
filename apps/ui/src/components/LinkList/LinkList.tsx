'use client'

import { LinkListActions } from '@/components/LinkList/LinkListActions'
import { LinkListItem } from '@/components/LinkList/LinkListItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'

export function LinkList({ links }: { links: any[]; pagination: any }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex">
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
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
