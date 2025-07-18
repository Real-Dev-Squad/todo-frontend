import { UserSearchIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export const ReassignUser = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer hover:bg-gray-200 hover:text-gray-800 active:bg-gray-300 active:text-gray-900"
        >
          <UserSearchIcon className="h-5 w-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Reassign user</TooltipContent>
    </Tooltip>
  )
}
