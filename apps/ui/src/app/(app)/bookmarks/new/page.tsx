'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createUrl } from '@/lib/api/calls/createUrl'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const urlSchema = z.object({
  url: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.string().trim().url().startsWith('http'),
  ),
})

export default function NewLinkPage() {
  const [error, setError] = useState<string | null>(null)
  const [resp, setResp] = useState<unknown | null>(null)
  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: '',
    },
  })

  const submitUrl = async (values: z.infer<typeof urlSchema>) => {
    try {
      const res = await createUrl(values)
      setResp(res)
    } catch (_) {
      setError('Submission Error')
    }
  }

  return (
    <div>
      {resp ? (
        <pre>
          <code>{JSON.stringify(resp, null, 2)}</code>
        </pre>
      ) : null}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitUrl)}
          className="grid w-full items-center gap-4"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="url">URL</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error ? (
            <div className="bg-red-10 text-red-800 p-2 text-sm">{error}</div>
          ) : null}

          <div className="flex justify-between">
            <Button type="submit">Submit URL</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
