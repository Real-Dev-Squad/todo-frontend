import { cn, debounce } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'
import { Input } from './ui/input'

type SearchbarProps = React.ComponentProps<'input'> & {
  containerClassName?: string
}

export const Searchbar = ({
  placeholder = 'Search...',
  containerClassName,
  onChange,
  ...props
}: SearchbarProps) => {
  const debounceOnChange = onChange ? debounce(onChange) : undefined

  return (
    <div className={cn('relative', containerClassName)}>
      <Input placeholder={placeholder} onChange={debounceOnChange} {...props} />
      <SearchIcon className="text-muted-foreground absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2" />
    </div>
  )
}
