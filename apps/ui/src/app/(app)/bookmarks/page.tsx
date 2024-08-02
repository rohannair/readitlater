import { LinkList } from '@/components/LinkList'
import { getLinksForUser } from '@/lib/api/calls/getLinksForUser'

interface LinksPageParams {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function LinksPage({ searchParams }: LinksPageParams) {
  const page: number = Number(searchParams.page) || 1
  const pageSize: number = Number(searchParams.pageSize) || 10
  const sort = (searchParams.sort || 'createdAt') as string
  const direction = (searchParams.direction || 'desc') as string
  const search = (searchParams.search || '') as string

  const { links, pagination } = await getLinksForUser({
    page: page.toString(),
    pageSize: pageSize.toString(),
    sort,
    direction,
    search,
  })

  return <LinkList links={links ?? []} pagination={pagination} />
}
