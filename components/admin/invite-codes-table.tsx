'use client'

import { InviteCodesApi } from '@/api/invite-codes/invite-codes.api'
import { TInviteCode } from '@/api/invite-codes/invite-codes.types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const InviteCodesTableRow = ({ inviteCode }: { inviteCode: TInviteCode }) => {
  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      toast.success('Invite code copied to clipboard!')
    } catch {
      toast.error('Failed to copy invite code')
    }
  }

  return (
    <TableRow>
      <TableCell className="font-mono text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium">{inviteCode.code}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(inviteCode.code)}
            className="h-6 w-6 p-0"
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        {inviteCode.description || <span className="text-gray-400 italic">No description</span>}
      </TableCell>
      <TableCell>
        <Badge variant={inviteCode.is_used ? 'secondary' : 'default'}>
          {inviteCode.is_used ? 'Used' : 'Unused'}
        </Badge>
      </TableCell>
      <TableCell className="text-sm">{inviteCode.created_by.name}</TableCell>
      <TableCell className="text-sm">
        {inviteCode.used_by?.name || <span className="text-gray-400">-</span>}
      </TableCell>
      <TableCell className="text-sm">
        {format(new Date(inviteCode.created_at), 'dd MMM yyyy')}
      </TableCell>
      <TableCell className="text-sm">
        {inviteCode.used_at ? (
          format(new Date(inviteCode.used_at), 'dd MMM yyyy')
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </TableCell>
    </TableRow>
  )
}

const InviteCodesTableShimmer = () => (
  <TableBody>
    {new Array(5).fill(0).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton className="h-4 w-32" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-6 w-16" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-20" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-20" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-24" />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
)

export const InviteCodesTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(8)

  const { data, isLoading, error } = useQuery({
    queryKey: InviteCodesApi.getInviteCodes.key({ page: currentPage, limit: pageSize }),
    queryFn: () => InviteCodesApi.getInviteCodes.fn({ page: currentPage, limit: pageSize }),
    staleTime: 5 * 60 * 1000,
  })

  const codes = data?.codes || []

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-500">Failed to load invite codes</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Used By</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Used At</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <InviteCodesTableShimmer />
          ) : (
            <TableBody>
              {codes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                    No invite codes found
                  </TableCell>
                </TableRow>
              ) : (
                codes.map((inviteCode) => (
                  <InviteCodesTableRow key={inviteCode.id} inviteCode={inviteCode} />
                ))
              )}
            </TableBody>
          )}
        </Table>
      </div>

      {data && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing {codes.length} invite codes</div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!data.previous_url || currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <span className="text-sm text-gray-600">Page {currentPage}</span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!data.next_url}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
