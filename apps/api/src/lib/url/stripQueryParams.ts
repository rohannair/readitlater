import { isValidUrl } from '@/lib/url/isValidUrl'

export function stripQueryParams(url: string): string {
  if (!isValidUrl(url)) {
    throw new Error('Invalid URL')
  }

  const urlObj = new URL(url)
  urlObj.search = ''
  return urlObj.toString()
}
