// 'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FormInputProps {
  id: string
  key?: string
  name: string
  type: string
  children: string
  placeholder?: string
  errors?: string[]
  autoFocus?: boolean
}

const Alert = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="text-xs text-red-600" role="alert">
      <span className="font-semibold">Error: </span>
      {children}
    </div>
  )
}

export function FormInput({
  id,
  key,
  name,
  type,
  placeholder,
  children,
  errors,
  autoFocus,
}: FormInputProps) {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id}>{children}</Label>
      <Input
        id={id}
        key={key}
        name={name}
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      {errors && <Alert>{errors}</Alert>}
    </div>
  )
}
