export default async function Page({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params

  return <div>My Post: {teamId}</div>
}
