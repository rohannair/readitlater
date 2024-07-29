'use server'

import { z } from 'zod'
import { createServerApiClient } from '@/lib/api/serverClient'

const getLinkSchema = z.object({
  page: z.coerce
    .number()
    .optional()
    .default(1)
    .transform((n) => n.toString()),
  pageSize: z.coerce
    .number()
    .optional()
    .default(10)
    .transform((n) => n.toString()),
  sort: z.string().optional().default('createdAt'),
  direction: z.string().optional().default('desc'),
  search: z.string().optional().default(''),
})

type GetLinkProps = z.infer<typeof getLinkSchema>

export async function getLinksForUser(props: GetLinkProps) {
  const client = await createServerApiClient()
  const query = getLinkSchema.parse(props)

  const response = await client.api.v1.links.$get({
    query,
  })

  if (!response.ok) {
    console.error(await response.text())
    throw new Error('Failed to fetch links')
  }

  return await response.json()
}
