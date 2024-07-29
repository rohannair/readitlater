import { formatRelative } from 'date-fns'
import Link from 'next/link'
import type { MouseEventHandler } from 'react'

interface LinkListItemProps {
  href: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  prefetch?: boolean
  title: string
  url: string
  summary: string
  tags?: { key: string; label: string }[]
  createdAt: string
}

export const LinkListItem = (props: LinkListItemProps) => {
  return (
    <Link href={props.href} className="block p-2" prefetch={props.prefetch}>
      <h3 className="font-semibold text-lg truncate">{props.title}</h3>
      <div className="text-sm text-muted-foreground">{props.url}</div>
      <div className="text-sm text-foreground">
        Added {formatRelative(props.createdAt, new Date())}
      </div>

      <p className="text-sm text-foreground line-clamp-2 mt-2">
        {props.summary}
      </p>
      <div className="flex items-center gap-2 not(:empty):mt-2">
        {props?.tags?.map((tag) => (
          <div
            className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground"
            key={tag.key}
          >
            {tag.label}
          </div>
        ))}
      </div>
    </Link>
  )
}
