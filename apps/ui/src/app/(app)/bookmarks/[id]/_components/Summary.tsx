import { cn } from '@/lib/utils'

export const Summary = ({ summary }: { summary: string }) => {
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
