'use client'

import { useAuth } from '@/hooks/useAuth'
import { Loader2, LogOutIcon } from 'lucide-react'
import { Shimmer } from '../common/shimmer'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { SigninButton } from './signin-button'

const LogoutButton = () => {
  const { logoutMutation } = useAuth()

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <DropdownMenuItem className="!bg-transparent p-0">
      <Button
        variant="ghost"
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
        className="w-full justify-start text-red-500 hover:bg-red-100 hover:text-red-600 disabled:text-gray-700"
      >
        {logoutMutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <LogOutIcon className="h-4 w-4 text-inherit" />
        )}
        Logout
      </Button>
    </DropdownMenuItem>
  )
}

export const UserProfileMenu = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <Shimmer className="h-10 w-10 rounded-full" />
  }

  if (!user) {
    return <SigninButton />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.picture} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
