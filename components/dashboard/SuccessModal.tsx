import React, { useState } from 'react'
import { X, Copy, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
interface SuccessModalProps {
  onClose?: () => void
  teamName?: string
  inviteCode: string
}

export function SuccessModal({ onClose, teamName = 'Team Name', inviteCode }: SuccessModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (inviteCode) {
      await navigator.clipboard.writeText(inviteCode)
      setCopied(true)
      toast.success('Invite code copied')
    }
  }

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="relative w-full max-w-xs rounded-2xl bg-white p-6 shadow-lg md:max-w-sm md:rounded-3xl md:p-8">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-7 w-7 md:top-4 md:right-4 md:h-8 md:w-8"
          onClick={onClose}
        >
          <X className="h-3 w-3 md:h-4 md:w-4" />
        </Button>

        <div className="text-center">
          <h2 className="mb-3 pr-6 text-lg font-semibold text-gray-900 md:mb-4 md:text-xl">
            &ldquo;{teamName}&rdquo; created successfully
          </h2>
          <p className="text-xs leading-relaxed text-gray-600 md:text-sm">
            You can start designing tasks, setting goals, and collaborating in real time.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <p>Invite Code</p>
            <span className="rounded border border-gray-300 bg-white px-6 py-1 font-mono select-all">
              {inviteCode}
            </span>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="h-8 w-12"
              onClick={handleCopy}
              aria-label="Copy invite code"
            >
              {copied ? <CheckCircle className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
