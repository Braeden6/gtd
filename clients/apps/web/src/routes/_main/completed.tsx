import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/completed')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/completed"!</div>
}
