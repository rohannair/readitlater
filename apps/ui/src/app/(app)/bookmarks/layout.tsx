'use client'

import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Boxes, Link as LinkIcon, Tags } from 'lucide-react'
import Link from 'next/link'
import { Links } from './_components/Links'
import { getLinksForUser } from '@/lib/api/calls/getLinksForUser'
import { useEffect, useState } from 'react'

function Heading({ children }: { children: string }) {
  return <h3 className="font-semibold text-white mb-2">{children}</h3>
}

function ListItem({
  Icon,
  href,
  children,
}: { Icon: React.ElementType; href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="py-1 flex flex-row gap-2 items-center text-gray-400 hover:text-gray-300"
    >
      <Icon className="size-4" />
      <span className="text-gray-400 hover:text-gray-300">{children}</span>
      <div className="ml-auto">0</div>
    </Link>
  )
}

export default function BookmarkLayout({
  children,
}: { children: React.ReactNode }) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [links, setLinks] = useState<any>(null)

  useEffect(() => {
    async function fetchLinks() {
      const { links } = await getLinksForUser()
      setLinks(links)
    }
    fetchLinks()
  }, [])

  return (
    <div className="grid grid-cols-12">
      <div className="flex flex-col col-span-3 border-r bg-gray-700 border-gray-600 p-4">
        <Heading>Links</Heading>
        <nav>
          <ListItem Icon={LinkIcon} href="#">
            All
          </ListItem>
          <ListItem Icon={Tags} href="#">
            Categories
          </ListItem>
          <ListItem Icon={Boxes} href="#">
            Tags
          </ListItem>
          <hr className="border-t border-zinc-400 my-4 w-full h-[1px]" />
          <Links links={links} />
        </nav>
      </div>
      <div className="col-span-9">
        <div className="">
          <DialogTrigger asChild>
            <Button size="sm">New Bookmark</Button>
          </DialogTrigger>
        </div>
        <div className="flex-grow bg-white text-gray-900">{children}</div>
      </div>
    </div>
  )
}
