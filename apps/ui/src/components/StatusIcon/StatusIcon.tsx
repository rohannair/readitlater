import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleXIcon,
} from 'lucide-react'
import { match } from 'ts-pattern'

export type LinkStatus = 'submitted' | 'processing' | 'completed' | 'error'
export function StatusIcon({ status }: { status: LinkStatus }) {
  return match(status)
    .with('submitted', () => (
      <span className="text-yellow-500">
        <CircleDashedIcon className="size-3" />
      </span>
    ))
    .with('processing', () => (
      <span className="text-yellow-500">
        <CircleDotDashedIcon className="size-3" />
      </span>
    ))
    .with('completed', () => (
      <span className="text-green-500">
        <CircleCheckIcon className="size-3" />
      </span>
    ))
    .otherwise(() => (
      <span className="text-red-500">
        <CircleXIcon className="size-3" />
      </span>
    ))
}
