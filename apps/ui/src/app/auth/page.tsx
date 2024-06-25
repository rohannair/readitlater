import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoginForm } from './_forms/login-form'

interface AuthProps {
  searchParams: {
    [key: string]: string | undefined
  }
}

export default function Auth({ searchParams }: AuthProps) {
  return (
    <Card className="min-w-[480px]">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up or Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm redirect={searchParams.redirect ?? '/'} />
      </CardContent>
    </Card>
  )
}
