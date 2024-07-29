'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { login } from '@/actions/login'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useState } from 'react'

const MIN_PASSWORD_LENGTH = 5
const loginSchema = z.object({
  email: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Email is invalid'),
  ),
  password: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(
      MIN_PASSWORD_LENGTH,
      `Password needs to be at least ${MIN_PASSWORD_LENGTH} characters long`,
    ),
  redirect: z.string().default('/'),
})

export function LoginForm({
  redirectUrl,
}: {
  redirectUrl: string
}) {
  const router = useRouter()
  const [loginError, setLoginError] = useState('')
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submitLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      const res = await login(values)

      if (res?.user) {
        router.push(redirectUrl)
      }
    } catch (_) {
      setLoginError('Invalid email or password')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitLogin)}
        className="grid w-full items-center gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="hello@example.com" autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {loginError ? (
          <div className="bg-red-100 text-red-800 p-2 text-sm rounded-sm">
            <span className="font-bold">Error: </span>
            {loginError}
          </div>
        ) : null}

        <div className="flex justify-between">
          <Button variant="link" size="sm">
            Forgot password?
          </Button>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </Form>
  )
}
