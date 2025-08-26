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

const DIALOG_CONTENT = {
  leave: {
    title: 'Leave Team',
    description:
      'Are you sure you want to leave this team? You will lose access to its tasks and members.',
    action: 'Leave Team',
  },
  remove: {
    title: 'Remove Member',
    description:
      'Are you sure you want to remove this member from the team? They will lose access to all tasks and team information.',
    action: 'Remove Member',
  },
}
type Mode = keyof typeof DIALOG_CONTENT

type LeaveTeamDialogProps = {
  mode: Mode
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
  const content = DIALOG_CONTENT[mode]
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="h-max text-xl">{content.title}</AlertDialogTitle>
          <AlertDialogDescription>{content.description}</AlertDialogDescription>
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
            {content.action}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
