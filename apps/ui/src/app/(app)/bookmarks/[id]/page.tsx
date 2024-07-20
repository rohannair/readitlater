'use server'

import { getLink } from '@/lib/api/calls/getLink'
import { cn } from '@/lib/utils'
import { Fragment } from 'react'
import Markdown from 'react-markdown'

const Summary = ({ summary }: { summary: string }) => {
  const lines = summary.split('\n\n')
  return (
    <div className="rounded-sm border border-blue-300 bg-blue-200 p-2 text-sm">
      <h4 className="text-sm font-semibold">AI Summary:</h4>
      {lines.map((line: string, index: number) => (
        <p
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a unique key for each line
          key={`line-${index}`}
          className={cn('text-xs', index < lines.length - 1 ? 'mb-2' : '')}
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
  const { summary, cleaned } = link

  return (
    <div className="flex flex-col gap-5">
      <Summary summary={summary} />
      <Markdown className="prose">{cleaned}</Markdown>

      {/* <pre>
        <code className="w-32 font-mono text-sm text-wrap whitespace-pre-wrap">
          {JSON.stringify({ ...rest }, null, 2)}
        </code>
      </pre> */}
    </div>
  )
}
