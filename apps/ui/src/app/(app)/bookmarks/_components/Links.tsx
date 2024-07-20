import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { match } from 'ts-pattern'

function BookmarkLink({
  id,
  url,
  title,
  // tags,
  createdAt,
  status,
}: {
  id: string
  url: string
  title: string
  tags: string[]
  createdAt: string
  status: string
}) {
  type BadgeColor = 'secondary' | 'destructive' | 'default'
  const badgeColor = match(status)
    .with('error', () => 'destructive')
    .with('completed', () => 'default')
    .otherwise(() => 'secondary') as BadgeColor

  return (
    <Link
      key={id}
      href={`/bookmarks/${id}`}
      className="flex items-center justify-between rounded-md bg-muted/50 p-3 transition-colors hover:bg-muted/50"
    >
      <div className="flex flex-col items-center gap-3">
        <div>
          <h4 className="text-sm font-bold">{title}</h4>
          <div className="text-xs text-muted-foreground text-wrap break-all">
            {url.split('?')[0]}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Added: {new Date(createdAt).toDateString()}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <Badge variant={badgeColor} className="text-xs">
              {status}
            </Badge>
          </div>
        </div>
        {/* {tags?.map((tag: string) => (
          <div className="text-xs p-1" key={tag}>
            {tag}
          </div>
        ))} */}
      </div>
    </Link>
  )
}

export function Links({ links }: { links: any[] }) {
  if (!links) return null
  return (
    // <div className="">
    <ScrollArea className="h-[500px] w-full">
      <div className="flex flex-col gap-y-4">
        {links?.map((link) => <BookmarkLink key={link.id} {...link} />) ?? null}
      </div>
    </ScrollArea>
    // </div>
  )
}
