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
  title: string
  description: string
  buttonText: string
  open: boolean
  children: ReactNode
  onSubmit: () => void
  onOpenChange: (open: boolean) => void
  isSubmitting: boolean
}

export const LeaveTeamDialog = ({
  title,
  description,
  buttonText,
  open,
  onSubmit,
  onOpenChange,
  isSubmitting,
  children,
}: LeaveTeamDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="h-max text-xl">{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            type="submit"
            onClick={() => {
              onSubmit()
            }}
            disabled={isSubmitting}
          >
            {buttonText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
