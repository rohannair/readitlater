import setCookieParser from 'set-cookie-parser'
import { client } from '../client'

export async function login(json: {
  email: string
  password: string
}) {
  const res = await client.api.auth.login.$post({
    json,
  })

  console.log(res.headers)

  // const cookies = setCookieParser.parse(res.headers.raw()['set-cookie'])
  // for (const cookie of cookies) {
  //   res.headers.append('Set-Cookie', cookie.toString())
  // }

  return res
}
