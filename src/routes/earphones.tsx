import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/earphones')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/earphones"!</div>
}
