'use client'

import { FormInput } from '@/app/(auth)/_forms/form-input'
import { Button } from '@/components/ui/button'
import { createUser } from '@/lib/api/calls/createUser'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { redirect } from 'next/navigation'
import { useFormState } from 'react-dom'
import { z } from 'zod'

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

const parseData = (formData: FormData) => {
  return parseWithZod(formData, { schema: createUserSchema })
}

async function submitCreateUser(_prevState: unknown, formData: FormData) {
  const result = parseData(formData)

  if (result.status !== 'success') {
    return result.reply()
  }

  const { redirect: redirectUrl, ...value } = result.value

  await createUser(value)

  redirect(redirectUrl)
}

export function SignupForm({
  redirect,
}: {
  redirect: string
}) {
  const [lastResult, action] = useFormState(submitCreateUser, undefined)
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
          errors={fields.password.errors}
        >
          Password
        </FormInput>
        <input type="hidden" name="redirect" value={redirect} />

        <div className="flex justify-between">
          <Button type="submit">Signup</Button>
        </div>
      </div>
    </form>
  )
}
