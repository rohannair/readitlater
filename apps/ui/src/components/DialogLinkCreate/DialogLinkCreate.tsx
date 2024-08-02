'use client'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createUrl } from '@/actions/create-url'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

const linkCreateSchema = z.object({
  url: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.string().trim().url().startsWith('http'),
  ),
})

export const DialogLinkCreate = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof linkCreateSchema>>({
    resolver: zodResolver(linkCreateSchema),
    defaultValues: {
      url: '',
    },
  })

  const submit = async (values: z.infer<typeof linkCreateSchema>) => {
    setIsSubmitting(true)
    try {
      await createUrl(values)
      router.push('/bookmarks')
      router.refresh()
    } catch (_) {
      console.error('Failed to create URL')
    } finally {
      form.reset()
      setIsSubmitting(false)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New Bookmark</DialogTitle>
        <DialogDescription>Add a new bookmark manually.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(submit)}>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name" className="text-right">
                  URL
                </FormLabel>
                <FormControl>
                  <Input {...field} className="col-span-3" autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="flex flex-row gap-x-4">
            <DialogClose asChild>
              <Button variant="link">Close</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit URL'}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
