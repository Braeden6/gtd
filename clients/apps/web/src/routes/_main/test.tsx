import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/test"!</div>
}
