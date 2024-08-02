import { Fragment_Mono, Instrument_Sans } from 'next/font/google'

export const fontSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontMono = Fragment_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400'],
})