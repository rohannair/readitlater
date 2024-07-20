import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { match } from 'ts-pattern'

type BadgeColor = 'secondary' | 'destructive' | 'default'

export const StatusBadge = ({
  status,
}: {
  status: 'completed' | 'processing' | 'error'
}) => {
  const variant = match(status)
    .with('error', () => 'destructive')
    .with('completed', () => 'default')
    .otherwise(() => 'secondary') as BadgeColor

  return (
    <Badge variant={variant} className="text-xs flex-grow-0 opacity-75">
      {status}
    </Badge>
  )
}
