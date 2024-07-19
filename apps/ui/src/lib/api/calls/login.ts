import { client } from '@/lib/api/client'

export async function login(json: {
  email: string
  password: string
}) {
  const res = await client.auth.login.$post({ json })

  if (!res.ok) {
    throw new Error('Login failed')
  }

  return await res.json()
}
