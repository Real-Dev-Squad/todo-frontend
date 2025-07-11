import React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SuccessModalProps {
  onClose?: () => void
  teamName?: string
}

export function SuccessModal({ onClose, teamName = 'Team Name' }: SuccessModalProps) {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="relative w-full max-w-xs rounded-2xl bg-gray-200 p-6 shadow-lg md:max-w-sm md:rounded-3xl md:p-8">
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
      </div>
    </div>
  )
}
