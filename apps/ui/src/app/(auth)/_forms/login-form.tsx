'use client'

import { FormInput } from '@/app/(auth)/_forms/form-input'
import { Button } from '@/components/ui/button'
import { login } from '@/lib/api/calls/login'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { redirect } from 'next/navigation'
import { useFormState } from 'react-dom'
import { z } from 'zod'

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

const parseData = (formData: FormData) => {
  return parseWithZod(formData, { schema: loginSchema })
}

async function submitLogin(_prevState: unknown, formData: FormData) {
  const result = parseData(formData)

  if (result.status !== 'success') {
    return result.reply()
  }

  const { redirect: redirectUrl, ...value } = result.value

  await login(value)

  redirect(redirectUrl)
}

export function LoginForm({
  redirect,
}: {
  redirect: string
}) {
  const [lastResult, action] = useFormState(submitLogin, undefined)
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseData(formData)
    },

    // Validate the form on blur event triggered
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      <div className="grid w-full items-center gap-4">
        <FormInput
          id="email"
          // key={fields.email.key}
          name={fields.email.name}
          type="email"
          placeholder="hello@example.com"
          errors={fields.email.errors}
          autoFocus
        >
          Email
        </FormInput>
        <FormInput
          id="password"
          // key={fields.password.key}
          name={fields.password.name}
          type="password"
          placeholder="••••••••••••"
          errors={fields.password.errors}
        >
          Password
        </FormInput>
        <input type="hidden" name="redirect" value={redirect} />

        <div className="flex justify-between">
          <Button variant="link" size="sm">
            Forgot password?
          </Button>
          <Button type="submit">Login</Button>
        </div>
      </div>
    </form>
  )
}
