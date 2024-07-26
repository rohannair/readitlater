import { Logomark } from '@/components/Logomark'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BookmarkIcon, LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="bg-[#333] text-white px-4 md:px-6 py-4 flex items-center justify-between">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <Logomark />
        {/* <BookmarkIcon className="h-6 w-6" /> */}
        <span className="text-xl font-semibold">Bookmark App</span>
      </Link>
      <nav className="flex items-center gap-4">
        <Link
          className="text-sm font-medium hover:underline"
          href="#"
          prefetch={false}
        >
          Bookmarks
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline"
          prefetch={false}
        >
          Folders
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link" className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <UserIcon className="h-4 w-4 mr-2" />
              My Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  )
}
