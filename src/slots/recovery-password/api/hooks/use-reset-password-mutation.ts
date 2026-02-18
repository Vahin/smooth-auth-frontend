'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils/toast-message-handler'

import { TypeResetPasswordSchema } from '../../model/schemas/reset-password.schema'
import { passworRecoveryService } from '../services/password-recovery.service'

export const useResetPasswordMutation = () => {
	const router = useRouter()
	const { mutate: reset, isPending: isLoadingReset } = useMutation({
		mutationKey: ['reset password'],

		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeResetPasswordSchema
			recaptcha: string
		}) => passworRecoveryService.reset(values, recaptcha),

		onSuccess(data: any) {
			toast.success('Проверьте почту', {
				description:
					'На Вашу почту была отправлена ссылка для подтверждения.'
			})
		},

		onError(error: Error) {
			toastMessageHandler(error)
		}
	})

	return { reset, isLoadingReset }
}
