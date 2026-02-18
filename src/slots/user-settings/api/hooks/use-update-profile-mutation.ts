'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils/toast-message-handler'

import { TypeUserSettingsSchema } from '../../model/schemes/user-settings.schema'
import { userSettingsService } from '../services/user-settings.service'

export const useUpdateProfileMutation = () => {
	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TypeUserSettingsSchema) =>
			userSettingsService.updateProfile(data),
		onSuccess: () => {
			toast.success('Профиль успешно обновлён')
		},
		onError: (error: Error) => {
			toastMessageHandler(error)
		}
	})

	return { update, isLoadingUpdate }
}
