import { TUser } from '@/api/users/users.types'
import { UserSearchIcon } from 'lucide-react'
import { ReactNode, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { UserSearchDropdown } from './user-search-dropdown'

type ReassignUserModalProps = {
  open: boolean
  children: ReactNode
  onOpenChange: (open: boolean) => void
}

const ReassignUserModal = ({ open, children, onOpenChange }: ReassignUserModalProps) => {
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null)

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onOpenChange(false)
      setSelectedUser(null)
      return
    }

    onOpenChange(true)
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reassign user</AlertDialogTitle>
        </AlertDialogHeader>

        <UserSearchDropdown
          value={selectedUser?.id}
          placeholder="Search user"
          onUserSelect={setSelectedUser}
        />

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={!selectedUser}>Reassign</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const ReassignUser = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <ReassignUserModal open={showModal} onOpenChange={setShowModal}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setShowModal(true)}
            className="cursor-pointer hover:bg-gray-200 hover:text-gray-800 active:bg-gray-300 active:text-gray-900"
          >
            <UserSearchIcon className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Reassign user</TooltipContent>
      </Tooltip>
    </ReassignUserModal>
  )
}
