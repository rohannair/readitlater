import { Markdown } from '@/components/Markdown'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface LinkDisplayProps {
  summary: string
  cleaned: string
}

export function LinkDisplay({ summary, cleaned }: LinkDisplayProps) {
  return (
    <section className="flex flex-col relative lg:grid lg:grid-cols-12 ">
      <Markdown>{cleaned}</Markdown>

      <div className="order-first  flex flex-col gap-4 relative lg:order-last lg:col-span-4 lg:px-2 lg:pt-6">
        <div className="lg:pr-4">
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
