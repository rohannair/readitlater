import { Markdown } from '@/components/Markdown'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface LinkDisplayProps {
  summary: string
  cleaned: string
}

export function LinkDisplay({ summary, cleaned }: LinkDisplayProps) {
  return (
    <section className="flex flex-col relative md:grid md:grid-cols-12">
      <Markdown>{cleaned}</Markdown>

      <div className="order-first flex flex-col gap-4 mb-4 relative md:order-last md:col-span-4 md:px-2 md:pt-6 md:mb-0">
        <div className="md:pr-4">
          {summary ? <Summary summary={summary} /> : <Skeleton />}
        </div>
      </div>
    </section>
  )
}

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
