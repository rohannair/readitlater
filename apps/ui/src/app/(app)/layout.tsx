import { Logomark } from '@/components/Logomark'
import Link from 'next/link'
import { NavLink } from './_components/NavLink'
import { ColorToggle } from './_components/ColorToggle'
import { LogoutButton } from './_components/LogoutButton'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row h-screen">
      <nav className="min-h-full relative">
        <div className="flex flex-col fixed inset-y-0 left-0 z-50 w-16 overflow-y-auto pb-4 h-full">
          <Link href="/" className="flex px-3 py-4 items-center justify-center">
            <Logomark />
          </Link>
          <NavLink href="/bookmarks" description="Bookmarks" icon="bookmark" />
          <NavLink href="/folders" description="Folders" icon="folder" />
          <div className="mt-auto flex flex-col gap-2">
            <ColorToggle />
            <LogoutButton />
          </div>
        </div>
      </nav>
      <div className="flex flex-col flex-grow pl-16">{children}</div>
    </div>
  )
}
