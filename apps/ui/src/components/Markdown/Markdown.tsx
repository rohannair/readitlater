import { cn } from '@/lib/utils'
import BaseMarkdown from 'react-markdown'

import rehypeHighlight from 'rehype-highlight'

export function Markdown({
  children,
}: {
  children: string
  components?: Record<string, React.ComponentType>
}) {
  return (
    <BaseMarkdown
      className={cn(
        'col-span-8 prose dark:prose-invert prose-purple max-w-none',
        'border-r border-muted pl-4 pt-6 pr-6 pb-10',
        'zwj-hide',
      )}
      // components={{ code }}
      skipHtml={true}
      rehypePlugins={[rehypeHighlight]}
    >
      {children}
    </BaseMarkdown>
  )
}
