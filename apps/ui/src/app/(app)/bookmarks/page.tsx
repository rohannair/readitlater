'use client'

import { LinkList } from '@/components/LinkList'
import { getLinksForUser } from '@/lib/api/calls/getLinksForUser'
import React, { useEffect, useState } from 'react'

export default function LinksPage() {
  const [links, setLinks] = useState<any[]>([])
  const [pagination, setPagination] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLinks() {
      try {
        setIsLoading(true)
        const { links: fetchedLinks, pagination: fetchedPagination } =
          await getLinksForUser()
        setLinks(fetchedLinks || [])
        setPagination(fetchedPagination)
      } catch (err) {
        setError('Failed to fetch links. Please try again later.')
        console.error('Error fetching links:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLinks()
  }, [])

  if (isLoading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error}</div>

  return <LinkList links={links} pagination={pagination} />
}
