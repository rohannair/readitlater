'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'

export const LogoutButton = ({ className }: { className: string }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          onClick={() => {}}
          className={cn(
            'flex px-3 py-4 items-center justify-center hover:bg-transparent',
            className,
          )}
        >
          <LogOut className="size-[1.2rem]" />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        className="flex bg-white rounded-sm p-1 text-xs ml--2 text-gray-900"
      >
        Log Out
      </TooltipContent>
    </Tooltip>
  )
}
