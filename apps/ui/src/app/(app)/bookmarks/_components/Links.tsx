import { getLinksForUser } from '@/lib/api/calls/getLinksForUser'
import Link from 'next/link'

function BookmarkLink({
  id,
  url,
  title,
  tags,
  createdAt,
}: {
  id: string
  url: string
  title: string
  tags: string[]
  createdAt: string
}) {
  'use client'
  return (
    <Link key={id} href={`/bookmarks/${id}`}>
      <h4 className="text-sm font-bold">{title}</h4>
      <div className="text-sm text-gray-400">({url})</div>

      <div className="text-xs font-light mt-2">
        Added: {new Date(createdAt).toDateString()}
      </div>

      {tags?.map((tag: string) => (
        <div className="text-xs p-1" key={tag}>
          {tag}
        </div>
      ))}
    </Link>
  )
}

export async function Links() {
  const { links } = (await getLinksForUser()) ?? { links: [] }

  return links?.map((link) => <BookmarkLink key={link.id} {...link} />) ?? null
}
