import { Badge } from '@/components/ui/badge'
import { CircleCheckBig, CircleGauge, CircleX } from 'lucide-react'
import { match } from 'ts-pattern'

type BadgeColor = 'secondary' | 'destructive' | 'default'

export const StatusBadge = ({
  status,
}: {
  status: 'completed' | 'processing' | 'error'
}) => {
  const { variant, icon } = match<string>(status)
    .with('error', () => ({
      variant: 'destructive',
      icon: <CircleX className="w-4 h-4" />,
    }))
    .with('completed', () => ({
      variant: 'default',
      icon: <CircleCheckBig className="w-4 h-4" />,
    }))
    .otherwise(() => ({
      variant: 'outline',
      icon: <CircleGauge className="w-4 h-4" />,
    })) as {
    variant: BadgeColor
    icon: JSX.Element | undefined
  }

  return (
    <Badge
      variant={variant}
      className="text-xs flex-grow-0 opacity-75 inline-flex gap-1"
    >
      {icon}
      {status}
    </Badge>
  )
}
