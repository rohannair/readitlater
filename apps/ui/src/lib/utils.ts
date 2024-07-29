import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createPaginationQueryString(baseUrl = '/') {
  return (params: Record<string, string>) => {
    const query = new URLSearchParams({
      page: params.page ?? '1',
      pageSize: params.pageSize ?? '10',
      sort: params.sort ?? 'createdAt',
      direction: params.direction ?? 'desc',
      search: params.search ?? '',
    }).toString()

    return `${baseUrl}?${query}`
  }
}
