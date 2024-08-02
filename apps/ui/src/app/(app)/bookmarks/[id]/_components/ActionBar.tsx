'use client'

import { deleteLink } from '@/actions/delete-link'
import { StatusBadge } from '@/components/StatusBadge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Share, Trash2 } from 'lucide-react'

interface ActionBarProps {
  status: 'processing' | 'completed' | 'error'
  id: string
}

export default function ActionBar({ status, id }: ActionBarProps) {
  return (
    <AlertDialog>
      <div className="col-span-4 px-4 pt-3 py-2 text-xs my-4 flex flex-row gap-2 items-center">
        <div className="ml-auto">
          <StatusBadge status={status} />
        </div>

        <AlertDialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <Trash2 size={16} />
          </Button>
        </AlertDialogTrigger>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost">
              <Share size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-xs">Share bookmark</TooltipContent>
        </Tooltip>
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            To add the link back you will have to resubmit.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteLink({ id })
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
