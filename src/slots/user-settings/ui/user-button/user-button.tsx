'use client'

import { LuLogOut } from 'react-icons/lu'

import { IUser } from '@/entities/auth'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'

import { useLogoutMutation } from '../../api/hooks/use-logout-mutation'

type UserButtonProps = {
	user: IUser
}

export const UserButton = ({ user }: UserButtonProps) => {
	const { logout, isLoadingLogout } = useLogoutMutation()



	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user.picture} />
					<AvatarFallback className='w-full'>
						{user.displayName.slice(0, 1)}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-40' align='end'>
				<DropdownMenuItem
					disabled={isLoadingLogout}
					onClick={() => logout()}
				>
					<LuLogOut className='mr-2 size-4' />
					Выйти
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
