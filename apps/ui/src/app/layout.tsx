import { CSPostHogProvider } from '@/app/providers'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { Dialog } from '@/components/ui/dialog'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Read it Later',
  description: 'Bookmark your favorite articles and read them later with AI.',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <CSPostHogProvider>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased overflow-y-scroll',
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delayDuration={200}>
              <Dialog>{children}</Dialog>
            </TooltipProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </CSPostHogProvider>
    </html>
  )
}
