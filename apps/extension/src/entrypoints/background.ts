import { env } from '@/lib/env'
import { match } from 'ts-pattern'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

async function login(credentials: { username: string; password: string }) {
  const parsed = loginSchema.parse(credentials)
  const res = await fetch(`${env.API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsed),
  })

  if (!res.ok) {
    return
  }

  // Make API call to 3rd party service
  // On success, store login info
  await chrome.storage.local.set({
    loggedIn: true,
    // @ts-ignore
    token: res.data.token,
  })
  return { success: true }
}

async function sendUrl(url: string) {
  const { token } = await chrome.storage.local.get('token')
  const res = await fetch(`${env.API_URL}/api/v1/url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: token,
    },
    body: JSON.stringify({ url }),
  })

  if (!res.ok) {
    return
  }

  return { status: 200, message: `Successfully saved ${url}` }
}

export default defineBackground(() => {
  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    match(request.action)
      .with('login', () => login(request.credentials).then(sendResponse))
      .with('sendUrl', () => sendUrl(request.url).then(sendResponse))

    return true // Indicates we want to send a response asynchronously
  })
})
