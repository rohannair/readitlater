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
  return (
    <Link
      key={id}
      href={`/bookmarks/${id}`}
      className="flex flex-col py-4 subpixel-antialiased border-b border-gray-500"
    >
      <h4 className="text-sm font-bold">{title}</h4>
      <div className="text-xs text-gray-300 text-wrap break-all">
        ({url.split('?')[0]})
      </div>
      <div className="text-xs text-gray-100 mt-2">
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

export function Links({ links }: { links: any[] }) {
  if (!links) return null
  return links?.map((link) => <BookmarkLink key={link.id} {...link} />) ?? null
}
