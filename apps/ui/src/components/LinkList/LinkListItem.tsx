import { StatusIcon, type LinkStatus } from '@/components/StatusIcon/StatusIcon'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { formatRelative } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import type { MouseEventHandler } from 'react'

interface LinkListItemProps {
  href: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  prefetch?: boolean
  title: string
  url: string
  imageUrl?: string
  summary: string
  status: LinkStatus
  tags?: { key: string; label: string }[]
  createdAt: string
}

export const LinkListItem = (props: LinkListItemProps) => {
  return (
    <Link
      href={props.href}
      className="grid group grid-cols-12 gap-5 p-2 hover:shadow-md transition-shadow rounded-lg dark:hover:bg-primary/20 dark:transition-colors ease-in-out duration-75"
      prefetch={props.prefetch}
    >
      <section className="col-span-3 flex  rounded-md overflow-hidden shadow-md">
        <AspectRatio ratio={16 / 9} className="w-full">
          <Image
            src={
              props.imageUrl ?? 'https://placehold.co/250x140/png?text=No+Image'
            }
            fill
            className="object-cover"
            alt={props.title ?? props.url}
          />
        </AspectRatio>
      </section>
      <section className="col-span-8">
        <div className="flex flex-row gap-1 items-baseline">
          <h3 className="font-semibold text-lg truncate">
            {props.title ?? props.url}
          </h3>
          <StatusIcon status={props.status} />
        </div>
        <div className="text-sm text-muted-foreground">
          {props.title ? props.url : null}
        </div>
        <div className="text-sm text-foreground">
          Added {formatRelative(props.createdAt, new Date())}
        </div>
      </section>
    </Link>
  )
}
