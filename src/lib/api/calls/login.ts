import { client } from '../client'

export async function login(json: {
  email: string
  password: string
}) {
  const res = await client.api.auth.login.$post({
    json,
  })

  return res
}
