import { cn } from '@/lib/utils'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={cn(
        'flex items-center justify-center w-full h-screen bg-background/50',
      )}
    >
      {children}
    </div>
  )
}
