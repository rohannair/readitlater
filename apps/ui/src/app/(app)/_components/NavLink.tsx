'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Bookmark, BookmarkCheck, Folder } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavLink = ({
  href,
  description,
  icon,
}: {
  href: string
  description: string
  icon: 'bookmark' | 'bookmark-check' | 'folder'
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  const Icon = {
    bookmark: Bookmark,
    'bookmark-check': BookmarkCheck,
    folder: Folder,
  }[icon]

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            'flex px-3 py-4 items-center justify-center',
            isActive && 'bg-gray-700 border-t border-gray-600',
          )}
        >
          <Icon className="size-[1.2rem]" />
        </Link>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        className="flex bg-white rounded-sm p-1 text-xs ml--2 text-gray-900"
      >
        {description}
      </TooltipContent>
    </Tooltip>
  )
}
