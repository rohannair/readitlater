'use server'

import { getLink } from '@/lib/api/calls/getLink'
import { getBaseDomain } from '@/lib/url'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import Markdown from 'react-markdown'

const Summary = ({ summary }: { summary: string }) => {
  const lines = summary.split('\n\n')
  return (
    <div className="rounded-sm border border-blue-300 bg-blue-200 p-2 text-sm">
      <h4 className="text-sm font-semibold">AI Summary:</h4>
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
  const { summary, cleaned, title, url, createdAt } = link
  const linkUrl = url.split('?')[0]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div>
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
          <div className="block text-xs">
            Created {formatDistanceToNow(new Date(createdAt))} ago
          </div>
        </div>

        <Summary summary={summary} />
      </div>
      <Markdown className="prose prose-sm prose-blue max-w-none">
        {cleaned}
      </Markdown>
    </div>
  )
}
