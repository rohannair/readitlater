import { Logomark } from '@/components/Logomark'
import Link from 'next/link'
import { NavLink } from './_components/NavLink'
import { ColorToggle } from './_components/ColorToggle'
import { LogoutButton } from './_components/LogoutButton'
import { cn } from '@/lib/utils'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full md:w-screen md:flex-row md:h-screen">
      <nav className="min-h-full relative">
        <div
          className={cn(
            'flex flex-row w-full',
            'z-50 overflow-y-auto md:pb-4 md:h-full',
            'md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-16',
          )}
        >
          <Link
            href="/"
            className="flex w-16 h-20 p-2 md:px-3 md:py-4 items-center justify-center"
          >
            <Logomark />
          </Link>
          <NavLink href="/bookmarks" description="Bookmarks" icon="bookmark" />
          <NavLink href="/folders" description="Folders" icon="folder" />
          <div className="flex flex-row pr-2 md:pr-0 md:gap-2 ml-auto md:mt-auto md:flex-col ">
            <ColorToggle className="h-full px-2" />
            <LogoutButton className="h-full px-2" />
          </div>
        </div>
      </nav>
      <div className="flex flex-col flex-grow md:pl-16">{children}</div>
    </div>
  )
}
