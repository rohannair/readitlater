import React from 'react'
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { TooltipContent } from '@radix-ui/react-tooltip'
import {
  CircleCheckBigIcon,
  CircleDashedIcon,
  CircleGaugeIcon,
  CircleXIcon,
} from 'lucide-react'
import { match } from 'ts-pattern'

export type LinkStatus = 'submitted' | 'processing' | 'completed' | 'error'

export function StatusIcon({
  status,
  className,
}: {
  status: LinkStatus
  className?: string
}) {
  const statusConfig = match(status)
    .with('submitted', () => ({
      color: 'text-yellow-500',
      Icon: CircleDashedIcon,
      tooltipText: 'Submitted',
    }))
    .with('processing', () => ({
      color: 'text-yellow-500',
      Icon: CircleGaugeIcon,
      tooltipText: 'Processing',
    }))
    .with('completed', () => ({
      color: 'text-green-500',
      Icon: CircleCheckBigIcon,
      tooltipText: 'Completed',
    }))
    .otherwise(() => ({
      color: 'text-red-500',
      Icon: CircleXIcon,
      tooltipText: 'Error',
    }))

  return (
    <span className={cn(statusConfig.color, className)}>
      <Tooltip>
        <TooltipTrigger>
          <statusConfig.Icon className="size-3" />
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs mb-1">{statusConfig.tooltipText}</div>
        </TooltipContent>
      </Tooltip>
    </span>
  )
}
