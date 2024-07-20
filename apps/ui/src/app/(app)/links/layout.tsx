import { createServerApiClient } from '@/lib/api'

export default async function LinkLayout({
  children,
}: { children: React.ReactNode }) {
  const client = await createServerApiClient()
  const res = await client.api.v1.links.$get({
    query: {
      page: '1',
      pageSize: '10',
    },
  })
  const links = await res.json()

  return (
    <div>
      <pre>{JSON.stringify(links, null, 2)}</pre>
      {children}
    </div>
  )
}
