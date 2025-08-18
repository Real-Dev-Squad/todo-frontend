'use client'

import { InviteCodesApi } from '@/api/invite-codes/invite-codes.api'
import { TGenerateInviteCodeRequest } from '@/api/invite-codes/invite-codes.types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Copy, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface GenerateInviteCodeModalProps {
  isOpen: boolean
  onClose: () => void
}

export const GenerateInviteCodeModal = ({ isOpen, onClose }: GenerateInviteCodeModalProps) => {
  const [description, setDescription] = useState('')
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const generateMutation = useMutation({
    mutationFn: (data: TGenerateInviteCodeRequest) => InviteCodesApi.generateInviteCode.fn(data),
    onSuccess: (data) => {
      if (data.code) {
        setGeneratedCode(data.code)
        toast.success('Invite code generated successfully!')
        queryClient.invalidateQueries({
          queryKey: ['InviteCodesApi.getInviteCodes'],
        })
      } else {
        toast.error('Invalid response from server')
      }
    },
    onError: () => {
      toast.error('Failed to generate invite code')
    },
  })

  const handleGenerate = () => {
    generateMutation.mutate({ description: description || undefined })
  }

  const handleClose = () => {
    setDescription('')
    setGeneratedCode(null)
    onClose()
  }

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      toast.success('Invite code copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy invite code')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Invite Code</DialogTitle>
        </DialogHeader>

        {!generatedCode ? (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="e.g., Code for marketing team creation"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleGenerate} disabled={generateMutation.isPending}>
                {generateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Code'
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Generated Invite Code</Label>
                <div className="mt-2 flex items-center gap-2">
                  <code className="flex-1 rounded border bg-white p-2 font-mono text-sm">
                    {generatedCode}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generatedCode)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {description && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">Description</Label>
                  <p className="mt-1 text-sm text-gray-600">{description}</p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button onClick={handleClose}>Done</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
