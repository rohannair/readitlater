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
        'prose dark:prose-invert prose-purple max-w-none',
        'lg:col-span-8 lg:border-r border-muted lg:pl-4 lg:pt-6 lg:pr-6 lg:pb-10',
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
