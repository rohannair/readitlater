import React from 'react'
import { Badge } from '@/components/ui/badge'
import { CircleCheckBig, CircleGauge, CircleX } from 'lucide-react'
import { match } from 'ts-pattern'

type BadgeColor = 'secondary' | 'destructive' | 'default' | 'outline'
type StatusType = 'completed' | 'processing' | 'error'

export const StatusBadge = ({ status }: { status: StatusType }) => {
  const statusConfig = match(status)
    .with('error', () => ({
      variant: 'destructive' as BadgeColor,
      Icon: CircleX,
      text: 'error',
    }))
    .with('completed', () => ({
      variant: 'default' as BadgeColor,
      Icon: CircleCheckBig,
      text: 'completed',
    }))
    .otherwise(() => ({
      variant: 'outline' as BadgeColor,
      Icon: CircleGauge,
      text: 'processing',
    }))

  return (
    <Badge
      variant={statusConfig.variant}
      className="text-xs flex-grow-0 opacity-75 inline-flex gap-1"
    >
      <statusConfig.Icon className="w-4 h-4" />
      {statusConfig.text}
    </Badge>
  )
}
