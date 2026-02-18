'use client'

// TODO: Перенести в entity?
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { authService } from '@/slots/auth-slot/api/services/auth.service'

import { toastMessageHandler } from '@/shared/utils/toast-message-handler'

export const useLogoutMutation = () => {
	const router = useRouter()

	const { mutate: logout, isPending: isLoadingLogout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			toast.success('Вы успешно вышли из системы')
			router.push('/auth/login')
		},
		onError: (error) => {
			toastMessageHandler(error)
		}
	})

	return { logout, isLoadingLogout }
}
