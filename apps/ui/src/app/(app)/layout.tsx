import { Logomark } from '@/components/Logomark'
import Link from 'next/link'
import { NavLink } from './_components/NavLink'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row h-screen">
      <nav className="min-h-full relative">
        <div className="fixed inset-y-0 left-0 z-50 block w-16 overflow-y-auto pb-4">
          <Link href="/" className="flex px-3 py-4 items-center justify-center">
            <Logomark />
          </Link>
          <NavLink href="/bookmarks" description="Bookmarks" icon="bookmark" />
          <NavLink href="/folders" description="Folders" icon="folder" />
        </div>
      </nav>
      <div className="flex flex-col flex-grow pl-16">{children}</div>
    </div>
  )
}
