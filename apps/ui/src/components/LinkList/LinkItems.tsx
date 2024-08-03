'use client'

import { LinkDrawer } from '@/components/LinkList/LinkDrawer'
import { StatusIcon, type LinkStatus } from '@/components/StatusIcon'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Drawer } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { formatRelative } from 'date-fns'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface LinkItemsProps {
  links: {
    id: string
    href: string
    prefetch?: boolean
    title: string
    url: string
    imageUrl?: string
    summary: string
    status: LinkStatus
    tags?: { key: string; label: string }[]
    createdAt: string
  }[]
}

export function LinkItems({ links }: LinkItemsProps) {
  const [selectedLink, setLink] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  const page = searchParams.get('page')
  const pageSize = searchParams.get('pageSize')
  const sort = searchParams.get('sort')
  const direction = searchParams.get('direction')
  const search = searchParams.get('search')

  return (
    <Drawer>
      {links.map((link) => {
        return (
          <DrawerTrigger
            key={link.id}
            className={cn(
              'grid grid-cols-12 w-full text-left gap-5 p-2 hover:shadow-md transition-shadow rounded-lg',
              'dark:hover:bg-primary/2- dark:transition-colors',
              'ease-in-out duration-75 group',
            )}
            onClick={() => {
              setLink(link.id)
              router.replace(
                `/bookmarks?${new URLSearchParams({
                  page: page || '1',
                  pageSize: pageSize || '10',
                  sort: sort || 'createdAt',
                  direction: direction || 'desc',
                  search: search || '',
                  selected: link?.id || '',
                }).toString()}`,
              )
            }}
          >
            <section className="col-span-3 flex rounded-md overflow-hidden shadow-md">
              <AspectRatio ratio={16 / 9} className="w-full">
                <Image
                  src={
                    link.imageUrl ??
                    'https://placehold.co/250x140/png?text=No+Image'
                  }
                  fill
                  className="object-cover"
                  alt={link.title ?? link.url}
                />
              </AspectRatio>
            </section>
            <section className="col-span-8">
              <div className="flex flex-row gap-1 items-baseline">
                <h3 className="font-semibold text-lg truncate">
                  {link.title ?? link.url}
                </h3>
                <StatusIcon status={link.status} />
              </div>
              <div className="text-sm text-muted-foreground">
                {link.title ? link.url : null}
              </div>
              <div className="text-sm text-foreground">
                Added {formatRelative(link.createdAt, new Date())}
              </div>
            </section>
          </DrawerTrigger>
        )
      })}

      <DrawerContent>
        <LinkDrawer
          id={selectedLink}
          close={() => {
            router.replace(
              `/bookmarks?${new URLSearchParams({
                page: page || '1',
                pageSize: pageSize || '10',
                sort: sort || 'createdAt',
                direction: direction || 'desc',
                search: search || '',
              }).toString()}`,
            )
          }}
        />
      </DrawerContent>
    </Drawer>
  )
}
