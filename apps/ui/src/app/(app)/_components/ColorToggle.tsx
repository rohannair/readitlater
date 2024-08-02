'use client'

import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { match } from 'ts-pattern'

export function ColorToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const { icon, onClick } = match(resolvedTheme)
    .with('dark', () => ({
      icon: <SunIcon />,
      onClick: () => setTheme('light'),
    }))
    .with('light', () => ({
      icon: <MoonIcon />,
      onClick: () => setTheme('dark'),
    }))
    .otherwise(() => ({
      icon: <MoonIcon />,
      onClick: () => setTheme('system'),
    }))

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="w-full text-xs"
    >
      {icon}
    </Button>
  )
}
