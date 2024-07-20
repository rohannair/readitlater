'use server'

import { StatusBadge } from '@/components/StatusBadge'
import { getLink } from '@/lib/api/calls/getLink'
import { getBaseDomain } from '@/lib/url'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import Markdown from 'react-markdown'

const Summary = ({ summary }: { summary: string }) => {
  const lines = summary.split('\n\n')
  return (
    <div className="rounded-sm border border-blue-200 bg-blue-100 text-black/80 p-2 text-sm">
      <h4 className="text-sm font-semibold mb-1">AI Summary:</h4>
      {lines.map((line: string, index: number) => (
        <p
          key={line}
          className={cn(
            'text-xs leading-4 subpixel-antialiased',
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
  const { summary, cleaned, title, url, createdAt, status, updatedAt } = link
  const linkUrl = url.split('?')[0]

  return (
    <div className="grid grid-cols-12 gap-4 relative">
      <Markdown className="col-span-8 prose prose-sm prose-blue max-w-none pr-6 pb-10">
        {cleaned}
      </Markdown>

      <div className="col-span-4 flex flex-col gap-4 relative">
        <div className="fixed top-4 pr-4">
          <h3 className="inline font-bold mb--2">{title}</h3>
          <span className="text-xs ml-1">(</span>
          <a
            href={linkUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-blue-600"
          >
            {getBaseDomain(linkUrl)}
          </a>
          <span className="text-xs">)</span>
          {/* <div className="block text-xs mb-5"></div> */}
          <div className="flex text-xs my-4 flex-col gap-2">
            <p>
              <StatusBadge status={status} />
            </p>
            <p>Created {formatDistanceToNow(new Date(createdAt))} ago</p>
            <p>Updated {formatDistanceToNow(new Date(updatedAt))} ago</p>
          </div>
          {summary && <Summary summary={summary} />}
        </div>
      </div>
    </div>
  )
}
