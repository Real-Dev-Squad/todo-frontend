import { TeamsPage } from '@/modules/teams'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_internal/teams/')({
  component: TeamsIndex,
})

function TeamsIndex() {
  return <TeamsPage />
}
