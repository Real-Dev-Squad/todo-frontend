import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessModalProps {
  onClose?: () => void;
  teamName?: string;
}

export function SuccessModal({ onClose, teamName = "Team Name" }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-200 rounded-3xl p-8 max-w-sm w-full relative shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-8 w-8"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            "{teamName}" created successfully
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            You can start designing tasks, setting goals, and collaborating in real time.
          </p>
        </div>
      </div>
    </div>
  );
}
