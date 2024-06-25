import { client } from '../client'

export const createUser = async (json: {
  email: string
  password: string
}) => {
  const res = await client.auth.register.$post({
    json,
  })

  if (!res.ok) {
    return {
      status: 'error',
      data: await res.json(),
    }
  }

  return await res.json()
}
