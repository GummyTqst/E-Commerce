import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$category/$productSlug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$category/$productSlug"!</div>
}
