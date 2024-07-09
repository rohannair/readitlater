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
import { submitLink } from '@/lib/api/calls/submitLink'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const linkCreateSchema = z.object({
  url: z.string().url('URL is invalid'),
})

export const DialogLinkCreate = () => {
  const form = useForm<z.infer<typeof linkCreateSchema>>({
    resolver: zodResolver(linkCreateSchema),
    defaultValues: {
      url: 'https://',
    },
  })

  const submit = async (values: z.infer<typeof linkCreateSchema>) => {
    const res = await submitLink(values)
    if (res?.status === 'error') {
      console.error('Failed to submit link:', res.data)
    }

    close()
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New Bookmark</DialogTitle>
        <DialogDescription>
          Add a new bookmark manually. You can also use the bookmarklet.
        </DialogDescription>
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
        </form>
        <DialogFooter className="flex flex-row gap-x-4">
          <DialogClose asChild>
            <Button variant="link">Close</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Submit URL</Button>
          </DialogClose>
        </DialogFooter>
      </Form>
    </DialogContent>
  )
}
