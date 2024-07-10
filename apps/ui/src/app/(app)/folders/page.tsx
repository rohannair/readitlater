'use server'
import { LinkList } from '@/components/LinkList'
import { getLinksForUser } from '@/lib/api/calls/getLinksForUser'

export default async function FoldersPage() {
  // const { links, pagination } = await getLinksForUser()

  return (
    <>
      {/* <LinkList links={links} pagination={pagination} /> */}
      <h1>Folders</h1>
    </>
  )
}
