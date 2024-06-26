import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SignupForm } from '../_forms/signup-form'

interface AuthProps {
  searchParams: {
    [key: string]: string | undefined
  }
}

export default function Auth({ searchParams }: AuthProps) {
  return (
    <Card className="min-w-[480px]">
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm redirect={searchParams.redirect ?? '/'} />
      </CardContent>
    </Card>
  )
}
