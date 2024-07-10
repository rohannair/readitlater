'use client'

import { DialogLinkCreate } from '@/components/DialogLinkCreate'
import { Dialog } from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { TooltipContent } from '@radix-ui/react-tooltip'
import { Bookmark, BookmarkCheck, Folder } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavLink = ({
  href,
  description,
  Icon,
}: {
  href: string
  description: string
  Icon: React.ElementType
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

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

const Nav = () => (
  <nav className="bg-gray-800">
    <Link href="/" className="flex p-4">
      <BookmarkCheck />
    </Link>
    <NavLink href="/bookmarks" description="Bookmarks" Icon={Bookmark} />

    <NavLink href="/folders" description="Folders" Icon={Folder} />
  </nav>
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <TooltipProvider delayDuration={200}>
        <div className="flex flex-row h-screen">
          <Nav />

          <div className="flex flex-col flex-grow">{children}</div>
        </div>
        <DialogLinkCreate />
      </TooltipProvider>
    </Dialog>
  )
}
