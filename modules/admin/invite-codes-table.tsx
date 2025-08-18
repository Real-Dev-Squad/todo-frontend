'use client'

import { InviteCodesApi } from '@/api/invite-codes/invite-codes.api'
import { TInviteCode } from '@/api/invite-codes/invite-codes.types'
import { TableShimmer } from '@/components/Shimmer/TableShimmer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { copyToClipboard } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

const InviteCodesTableRow = ({ inviteCode }: { inviteCode: TInviteCode }) => {
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
        {inviteCode.description || <span className="text-gray-400">No description</span>}
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

export const InviteCodesTable = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('limit') || '8', 10)

  const updateSearchParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    router.push(`?${params.toString()}`)
  }

  const { data, error, isLoading } = useQuery({
    queryKey: InviteCodesApi.getInviteCodes.key({ page: currentPage, limit: pageSize }),
    queryFn: () => InviteCodesApi.getInviteCodes.fn({ page: currentPage, limit: pageSize }),
    staleTime: 5 * 60 * 1000,
  })

  const codes = data?.codes || []

  const handlePageChange = (newPage: number) => {
    updateSearchParams({ page: newPage.toString() })
  }

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

          <TableBody>
            {isLoading ? (
              <TableShimmer count={5} columns={7} />
            ) : codes.length === 0 ? (
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
        </Table>
      </div>

      {data && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing {codes.length} invite codes</div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!data.previous_url || currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <span className="text-sm text-gray-600">Page {currentPage}</span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
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
