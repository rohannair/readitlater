import { Summary } from './_components/Summary'
import ActionBar from './_components/ActionBar'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getLink } from '@/lib/api/calls/getLink'
import { formatRelative } from 'date-fns'
import { ArrowBigLeft } from 'lucide-react'
import Link from 'next/link'
import { Markdown } from '@/components/Markdown'

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
      <section className="sticky top-0 left-0 shadow-sm right-0 bg-background z-50 flex flex-row gap-4 border-b border-muted flex-grow items-center">
        <div className="flex items-center justify-center pl-4">
          <Button
            size="icon"
            variant="outline"
            className="mt-2 w-7 h-7"
            asChild
          >
            <Link href="/bookmarks">
              <ArrowBigLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="flex-grow col-span-6 flex flex-col ">
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
        <div className="ml-auto">
          <ActionBar id={id} status={status} />
        </div>
      </section>

      <section className="grid grid-cols-12 relative">
        <Markdown>{cleaned}</Markdown>

        <div className="col-span-4 flex flex-col gap-4 relative px-2 pt-6">
          <div className="pr-4">
            {summary ? <Summary summary={summary} /> : <Skeleton />}
          </div>
        </div>
      </section>
    </div>
  )
}
