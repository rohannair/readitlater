import { Summary } from './_components/Summary'
import ActionBar from './_components/ActionBar'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getLink } from '@/lib/api/calls/getLink'
import { cn } from '@/lib/utils'
import { formatRelative } from 'date-fns'
import { ArrowBigLeft } from 'lucide-react'
import Link from 'next/link'
import Markdown from 'react-markdown'

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
      <section className="sticky top-0 bg-background z-50 grid grid-cols-12 gap-2 border-b border-muted flex-grow">
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
        <ActionBar id={id} status={status} />
      </section>

      <section className="grid grid-cols-12 relative">
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
      </section>
    </div>
  )
}
