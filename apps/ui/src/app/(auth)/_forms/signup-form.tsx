'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FormInput } from '@/app/(auth)/_forms/form-input'
import { Button } from '@/components/ui/button'
import { signup } from '@/actions/signup'
import { useForm } from 'react-hook-form'
import { parseWithZod } from '@conform-to/zod'
import { redirect } from 'next/navigation'
import { useFormState } from 'react-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const MIN_PASSWORD_LENGTH = 5
const createUserSchema = z.object({
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

export function SignupForm({
  redirect,
}: {
  redirect: string
}) {
  const router = useRouter()
  const [error, setError] = useState('')
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submitRegister = async (values: z.infer<typeof createUserSchema>) => {
    try {
      const res = await signup(values)

      // @ts-expect-error: RPC breakdown
      if (res?.user) {
        router.push(redirect)
      }
    } catch (_) {
      setError('Invalid email or password')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitRegister)}
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

        {error ? (
          <div className="bg-red-100 text-red-800 p-2 text-sm rounded-sm">
            <span className="font-bold">Error: </span>
            {error}
          </div>
        ) : null}

        <div className="flex justify-between">
          <Button type="submit">Register</Button>
        </div>
      </form>
    </Form>
  )
}
