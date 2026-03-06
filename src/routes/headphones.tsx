import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/headphones')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/headphones"!</div>
}
