import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  onClose?: () => void;
  teamName?: string;
}

export function SuccessModal({
  onClose,
  teamName = "Team Name",
}: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-xs md:max-w-sm w-full relative shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 md:top-4 md:right-4 h-7 w-7 md:h-8 md:w-8"
          onClick={onClose}
        >
          <X className="h-3 w-3 md:h-4 md:w-4" />
        </Button>

        <div className="text-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 pr-6">
            &ldquo;{teamName}&rdquo; created successfully
          </h2>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
            You can start designing tasks, setting goals, and collaborating in
            real time.
          </p>
        </div>
      </div>
    </div>
  );
}
