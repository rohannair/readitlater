import { DialogLinkCreate } from '@/components/DialogLinkCreate'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function Layout({
  children,
}: { children: React.ReactNode }) {
  return (
    <Dialog>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-row flex-grow gap-x-6 p-4">
          <aside className="w-48 p-2">
            <div className="flex items-stretch">
              <DialogTrigger asChild>
                <Button size="sm">New Bookmark</Button>
              </DialogTrigger>
            </div>
          </aside>
          <main>{children}</main>
        </div>
        <Footer />
      </div>
      <DialogLinkCreate />
    </Dialog>
  )
}
