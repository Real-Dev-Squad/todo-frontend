import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ teamId: string }> }) {
  redirect(`/teams/${(await params).teamId}/tasks`)
}
