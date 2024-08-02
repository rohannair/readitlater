'use server'

import { createServerApiClient } from '@/lib/api/serverClient'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteLink(json: {
  id: string
}) {
  const client = await createServerApiClient()
  const res = await client.api.v1.links[':id'].$delete({
    param: {
      id: json.id,
    },
  })

  if (!res.ok) {
    return {
      status: 'error',
      data: await res.json(),
    }
  }

  revalidatePath('/bookmarks')
  redirect('/bookmarks')
}
