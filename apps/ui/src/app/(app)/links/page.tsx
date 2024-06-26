'use server'
import { LinkList } from '@/components/LinkList'
import { getLinksForUser } from '@/lib/api/calls/getLinksForUser'

export default async function LinksPage() {
  const { links, pagination } = await getLinksForUser()
  console.log({
    links,
    pagination,
  })
  return (
    <>
      <LinkList links={links} pagination={pagination} />
    </>
  )
}
