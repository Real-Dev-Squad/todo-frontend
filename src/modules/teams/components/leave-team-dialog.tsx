import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="h-max text-xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
