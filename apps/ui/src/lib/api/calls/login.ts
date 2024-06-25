import { client } from '../client'

export async function login(json: {
  email: string
  password: string
}) {
  const res = await client.auth.login.$post({
    json,
  })

  const cookie = res.headers.get('set-cookie')
  console.log('cookie:', cookie)

  return res
}
