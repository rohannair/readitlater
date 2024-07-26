'use server'

import { StatusBadge } from '@/components/StatusBadge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getLink } from '@/lib/api/calls/getLink'
import { cn } from '@/lib/utils'
import { formatDistanceToNow, formatRelative } from 'date-fns'
import { ArrowBigLeft, Share, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Markdown from 'react-markdown'

const Summary = ({ summary }: { summary: string }) => {
  const lines = summary.split('\n\n')
  return (
    <div className="rounded-sm border border-muted bg-muted/80 text-foreground/80 p-2 text-sm">
      <h4 className="text-sm font-semibold mb-1">Summary:</h4>
      {lines.map((line: string, index: number) => (
        <p
          key={line}
          className={cn(
            'text-sm leading-5 subpixel-antialiased',
            index < lines.length - 1 ? 'mb-2' : '',
          )}
        >
          {line}
        </p>
      ))}
    </div>
  )
}

export default async function BookmarkDetails({
  params: { id },
}: {
  params: { id: string }
}) {
  const { link } = await getLink({ id })
  const { summary, cleaned, title, url, status, updatedAt } = link
  const linkUrl = url.split('?')[0]

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="sticky top-0 bg-background z-50 grid grid-cols-12 gap-2 border-b border-muted flex-grow">
        <div className="flex col-span-1 px-4 flex-grow items-center justify-center w-full h-full">
          <Button size="sm" variant="link" className="mt-2" asChild>
            <Link href="/bookmarks">
              <ArrowBigLeft size={16} className="mr-1" /> Back
            </Link>
          </Button>
        </div>
        <div className="col-span-6 px-4 pt-3 py-2 flex flex-col">
          <h3 className="inline font-bold mb--2">{title}</h3>
          <a
            href={linkUrl}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground text-xs"
          >
            {linkUrl}
          </a>
          <p className="text-xs mt-1 text-foreground/50">
            Last updated {formatRelative(new Date(updatedAt), new Date())}.
          </p>
        </div>
        <div className="col-span-4 px-4 pt-3 py-2 text-xs my-4 flex flex-row gap-2 items-center">
          <div className="ml-auto">
            <StatusBadge status={status} />
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost">
                <Trash2 size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-xs">Remove bookmark</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost">
                <Share size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-xs">Share bookmark</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="grid grid-cols-12 relative">
        <Markdown
          className={cn(
            'col-span-8 prose prose-invert prose-gray max-w-none prose-p:text-foreground/80',
            'border-r border-muted pl-4 pt-6 pr-6 pb-10',
            'zwj-hide',
          )}
        >
          {cleaned}
        </Markdown>

        <div className="col-span-4 flex flex-col gap-4 relative px-2 pt-6">
          <div className="pr-4">
            {summary ? <Summary summary={summary} /> : <Skeleton />}
          </div>
        </div>
      </div>
    </div>
  )
}
