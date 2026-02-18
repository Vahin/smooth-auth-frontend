'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SetStateAction } from 'react'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils/toast-message-handler'

import { authService } from '../../api/services/auth.service'
import { TypeLoginSchema } from '../schemas/login.schema'

export const useLoginMutation = (
	setIsShowTwoFactor: React.Dispatch<SetStateAction<boolean>>
) => {
	const router = useRouter()
	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ['login user'],

		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeLoginSchema
			recaptcha: string
		}) => authService.login(values, recaptcha),

		onSuccess(data: any) {
			if (data.message) {
				toastMessageHandler(data)
				setIsShowTwoFactor(true)
			} else {
				toast.success('Успешная авторизация')
				router.push('/dashboard/settings')
			}
		},

		onError(error: Error) {
			toastMessageHandler(error)
		}
	})

	return { login, isLoadingLogin }
}
