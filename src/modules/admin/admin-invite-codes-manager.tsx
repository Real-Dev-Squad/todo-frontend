import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { GenerateInviteCodeModal } from './generate-invite-code-modal'
import { InviteCodesTable } from './invite-codes-table'

export const AdminInviteCodesManager = () => {
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Team Invite Codes</CardTitle>
          <Button onClick={() => setIsGenerateModalOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Generate New Code
          </Button>
        </CardHeader>
        <CardContent>
          <InviteCodesTable />
        </CardContent>
      </Card>

      <GenerateInviteCodeModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
      />
    </div>
  )
}
