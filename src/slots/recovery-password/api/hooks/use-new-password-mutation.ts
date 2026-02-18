'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils/toast-message-handler'

import { TypeNewPasswordSchema } from '../../model/schemas/new-password.schema'
import { TypeResetPasswordSchema } from '../../model/schemas/reset-password.schema'
import { passworRecoveryService } from '../services/password-recovery.service'

export const useNewPasswordMutation = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const token = searchParams.get('token')

	const { mutate: setNewPassword, isPending: isSetNewPasswordLoading } =
		useMutation({
			mutationKey: ['new password'],

			mutationFn: ({
				values,
				recaptcha
			}: {
				values: TypeNewPasswordSchema
				recaptcha: string
			}) => passworRecoveryService.new(values, token, recaptcha),

			onSuccess(data: any) {
				toast.success('Пароль успешно изменён.', {
					description: 'Теперь вы можете войти в свой аккаунт.'
				})
				router.push('/dashboard/settings')
			},

			onError(error: Error) {
				toastMessageHandler(error)
			}
		})

	return { setNewPassword, isSetNewPasswordLoading }
}
