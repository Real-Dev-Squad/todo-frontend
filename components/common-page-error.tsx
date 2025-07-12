type Props = {
  title?: string
  description?: string
}

export const CommonPageError = ({
  title = 'Error loading data',
  description = 'Please try refreshing the page',
}: Props) => {
  return (
    <div className="p-6 text-center">
      <div className="mb-4 text-red-500">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
      >
        Refresh
      </button>
    </div>
  )
}
