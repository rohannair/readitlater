import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default async function Layout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow p-4">{children}</div>
      <Footer />
    </div>
  )
}
