import { createFileRoute } from '@tanstack/react-router'
import { AuthPage } from 'supertokens-auth-react/ui';
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@gtd/shared/components/ui/card';
import { LockKeyhole } from 'lucide-react';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
    <Card className="min-w-[500px] shadow-lg">
      <CardHeader className="text-center space-y-2 pb-2">
        <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
          <LockKeyhole className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome to GTD App</CardTitle>
        <CardDescription className="text-base">Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6 items-center justify-center">
        <div className="border-t border-border" />
        <div className="w-full overflow-hidden">
          <AuthPage preBuiltUIList={[ThirdPartyPreBuiltUI]} />
        </div>

      </CardContent>
      <CardFooter className="text-xs text-muted-foreground text-center flex justify-center">
        <p className="max-w-xs">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  </div>
  )
}
