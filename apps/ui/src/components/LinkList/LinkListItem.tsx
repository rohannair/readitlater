import { formatDistanceToNow, formatRelative } from 'date-fns'
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
    <div className="bg-foreground rounded-lg p-3 shadow-sm">
      <Link
        href={props.href}
        className="block"
        // onClick={props.onClick}
        prefetch={props.prefetch}
      >
        <h3 className="font-semibold text-lg truncate">{props.title}</h3>
        <p className="text-sm text-muted-foreground truncate">{props.url}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {props.summary}
        </p>
        <div className="flex items-center gap-2 mt-2">
          {props?.tags?.map((tag) => (
            <div
              className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground"
              key={tag.key}
            >
              {tag.label}
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          Added {formatRelative(props.createdAt, new Date())}
        </div>
      </Link>
    </div>
  )
}
