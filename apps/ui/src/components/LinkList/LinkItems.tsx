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
              'flex flex-col gap-2 cursor-pointer w-full p-2',
              'md:grid md:grid-cols-12 w-full text-left md:gap-5 md:p-4',
              'hover:shadow-md transition-shadow rounded-lg',
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
            <section className="w-full flex rounded-md shadow-sm md:col-span-3 md:overflow-hidden">
              <AspectRatio ratio={16 / 9} className="w-full">
                <Image
                  src={
                    link.imageUrl ??
                    'https://placehold.co/750x420/png?text=No+Image'
                  }
                  fill
                  className="object-cover"
                  alt={link.title ?? link.url}
                />
              </AspectRatio>
            </section>
            <section className="md:col-span-8 flex flex-col">
              <div className="flex md:flex-row gap-1 items-baseline">
                <h3 className="font-semibold text-2xl md:text-lg truncate text-wrap">
                  {link.title ?? link.url}
                </h3>
                <StatusIcon className="" status={link.status} />
              </div>
              <div className="text-sm text-muted-foreground text-wrap truncate">
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
              {
                scroll: false,
              },
            )
          }}
        />
      </DrawerContent>
    </Drawer>
  )
}
