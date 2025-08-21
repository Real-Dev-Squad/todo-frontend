import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { type ReactNode } from 'react'

type LeaveTeamDialogProps = {
  mode: string
  open: boolean
  children: ReactNode
  onSubmit: () => void
  onOpenChange: (open: boolean) => void
}

export const LeaveTeamDialog = ({
  mode,
  open,
  onSubmit,
  onOpenChange,
  children,
}: LeaveTeamDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className="">
          <AlertDialogTitle className="h-max text-xl">
            {mode === 'leave' ? 'Leave Team' : 'Remove Member'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {mode === 'leave'
              ? 'Are you sure you want to leave this team? You will lose access to its tasks and members.'
              : 'Are you sure you want to remove this member from the team? They will lose access to all tasks and team information.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="default"
            type="submit"
            onClick={() => {
              onSubmit()
              onOpenChange(false)
            }}
          >
            Leave Team
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
