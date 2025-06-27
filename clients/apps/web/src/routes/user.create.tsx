import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UsersService } from '@gtd/shared'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { User } from 'lucide-react'
import { useEffect } from 'react'

export const Route = createFileRoute('/user/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      navigate({ to: '/' })
    }
  }, [user])


  const createUserMutation = useMutation({
    mutationFn: async (userData: { first_name: string; last_name: string }) => {
      return await UsersService.createUserUsersCreatePost({
        first_name: userData.first_name,
        last_name: userData.last_name,
      })
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] })
      navigate({ to: '/' })
    },
    onError: (error) => {
      console.error('Failed to create user:', error)
    },
  })

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    validators: {
      onSubmit: ({ value }) => {
        const errors: Record<string, string> = {}
        
        if (!value.firstName.trim()) {
          errors.firstName = 'First name is required'
        }
        
        if (!value.lastName.trim()) {
          errors.lastName = 'Last name is required'
        }

        return Object.keys(errors).length > 0 ? { fields: errors } : undefined
      },
    },
    onSubmit: async ({ value }) => {
      await createUserMutation.mutateAsync({
        first_name: value.firstName.trim(),
        last_name: value.lastName.trim(),
      })
    },
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <User className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
          <p className="text-muted-foreground">
            Please provide your name to finish setting up your account
          </p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="space-y-4"
          >
            <form.Field
              name="firstName"
              validators={{
                onBlur: ({ value }) => {
                  if (!value.trim()) {
                    return 'First name is required'
                  }
                  return undefined
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your first name"
                    aria-invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="lastName"
              validators={{
                onBlur: ({ value }) => {
                  if (!value.trim()) {
                    return 'Last name is required'
                  }
                  return undefined
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your last name"
                    aria-invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!canSubmit || isSubmitting || createUserMutation.isPending}
                >
                  {isSubmitting || createUserMutation.isPending
                    ? 'Creating Account...'
                    : 'Complete Setup'}
                </Button>
              )}
            </form.Subscribe>

            {createUserMutation.isError && (
              <p className="text-sm text-destructive text-center">
                Failed to create account. Please try again.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
