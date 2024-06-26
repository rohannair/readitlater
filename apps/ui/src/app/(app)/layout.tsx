'use server'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getAuthCookie } from '@/lib/cookie'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: { children: React.ReactNode }) {
  const user = getAuthCookie()
  if (!user) {
    redirect('/login?redirect=/links')
  }
  return (
    <div>
      <Header />
      <div className="flex flex-grow">{children}</div>
      <Footer />
    </div>
  )
}
