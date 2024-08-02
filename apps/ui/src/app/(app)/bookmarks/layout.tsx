import { DialogLinkCreate } from '@/components/DialogLinkCreate'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { getLinksMetadata } from '@/lib/api/calls/getLinksMetadata'
import { Boxes, Link as LinkIcon, Tags } from 'lucide-react'
import Link from 'next/link'

function Heading({ children }: { children: string }) {
  return <h3 className="font-semibold mb-2">{children}</h3>
}

function ListItem({
  Icon,
  href,
  children,
  count = 0,
}: {
  Icon: React.ElementType
  href: string
  children: React.ReactNode
  count?: number
}) {
  return (
    <Link
      href={href}
      className="grid grid-cols-6 py-1 gap-2 items-center text-gray-400 hover:text-primary text-sm"
    >
      <Icon className="col-span-1 size-4" />
      <span className="col-span-4">{children}</span>
      <div className="col-span-1 rounded-full  bg-primary/5 text-xs font-bold py-1 text-center">
        {count}
      </div>
    </Link>
  )
}

export default async function BookmarkLayout({
  children,
}: {
  children: Readonly<React.ReactNode>
}) {
  const { linksCount, categoriesCount, tagsCount } = await getLinksMetadata()

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="flex flex-col col-span-2 border-r bg-muted/60 border-muted p-4 relative">
        <div className="sticky top-4">
          <Heading>Links</Heading>
          <nav>
            <ListItem Icon={LinkIcon} href="/bookmarks" count={linksCount}>
              All
            </ListItem>
            <ListItem Icon={Tags} href="#" count={categoriesCount}>
              Categories
            </ListItem>
            <ListItem Icon={Boxes} href="#" count={tagsCount}>
              Tags
            </ListItem>
            <hr className="border-t border-muted my-4 w-full h-[1px]" />
            <div className="my-4">
              <DialogTrigger asChild>
                <Button size="sm" className="flex w-full">
                  New Bookmark
                </Button>
              </DialogTrigger>
            </div>
          </nav>
        </div>
      </div>
      <div className="col-span-10">
        <div className="flex-grow">{children}</div>
      </div>
      <DialogLinkCreate />
    </div>
  )
}
