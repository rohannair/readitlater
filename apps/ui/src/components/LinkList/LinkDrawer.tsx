'use client'

import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { client } from '@/lib/api/client'
import { useEffect, useState } from 'react'
import { LinkDisplay } from '@/components/LinkDisplay/LinkDisplay'
import { formatRelative } from 'date-fns'
import Link from 'next/link'
import { Expand, X } from 'lucide-react'

interface LinkDrawerProps {
  id: string | null
  close: () => void
}

type TLink = {
  id: string
  summary: string
  cleaned: string
  title: string
  url: string
  updatedAt: string
}

export function LinkDrawer({ id, close }: LinkDrawerProps) {
  if (!id) return null

  const [link, setLink] = useState<TLink | null>(null)
  useEffect(() => {
    async function run() {
      if (!id) return

      const res = await client.api.v1.links[':id'].$get({ param: { id: id } })
      const { link } = (await res.json()) as {
        link: TLink
      }

      setLink(link)
    }

    run().catch(console.error)
  }, [id])

  return link ? (
    <>
      <DrawerHeader className="border-b border-border shadow-sm">
        <DrawerTitle>
          <div className="flex lg:flex-row">
            <h3 className="text-left text-2xl md:text-lg">{link?.title}</h3>
            <div className="ml-auto flex flex-row gap-2 ">
              <Button size="icon" variant="outline" asChild className="size-7">
                <Link href={`/bookmarks/${link.id}`}>
                  <Expand className="h-4 w-4" />
                </Link>
              </Button>
              <DrawerClose
                onClick={() => {
                  close()
                }}
                asChild
              >
                <Button size="icon" variant="outline" className="size-7">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerTitle>
        <DrawerDescription className="text-left">
          <a
            href={link?.url}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground text-xs"
          >
            {link?.url}
          </a>
          {link?.updatedAt && (
            <p className="text-xs mt-1 text-foreground/50">
              Last updated{' '}
              {formatRelative(new Date(link?.updatedAt), new Date())}.
            </p>
          )}
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 max-h-[67vh]  overflow-y-scroll">
        <LinkDisplay summary={link.summary} cleaned={link.cleaned} />
      </div>
      <DrawerFooter>
        <DrawerClose
          onClick={() => {
            close()
          }}
        >
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  ) : null
}
