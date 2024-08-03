import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipContent } from '@radix-ui/react-tooltip'
import {
  CircleCheckBigIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleGaugeIcon,
  CircleXIcon,
} from 'lucide-react'
import { match } from 'ts-pattern'

export type LinkStatus = 'submitted' | 'processing' | 'completed' | 'error'
export function StatusIcon({ status }: { status: LinkStatus }) {
  return match(status)
    .with('submitted', () => (
      <span className="text-yellow-500">
        <Tooltip>
          <TooltipTrigger>
            <CircleDashedIcon className="size-3" />
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs mb-1">Submitted</div>
          </TooltipContent>
        </Tooltip>
      </span>
    ))
    .with('processing', () => (
      <span className="text-yellow-500">
        <Tooltip>
          <TooltipTrigger>
            <CircleGaugeIcon className="size-3" />
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs mb-1">Processing</div>
          </TooltipContent>
        </Tooltip>
      </span>
    ))
    .with('completed', () => (
      <span className="text-green-500">
        <Tooltip>
          <TooltipTrigger>
            <CircleCheckBigIcon className="size-3" />
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs mb-1">Completed</div>
          </TooltipContent>
        </Tooltip>
      </span>
    ))
    .otherwise(() => (
      <span className="text-red-500">
        <Tooltip>
          <TooltipTrigger>
            <CircleXIcon className="size-3" />
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs mb-1">Error</div>
          </TooltipContent>
        </Tooltip>
      </span>
    ))
}
