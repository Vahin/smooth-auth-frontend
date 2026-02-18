'use client'

import { useQuery } from '@tanstack/react-query'

import { userSettingsService } from '@/slots/user-settings/api/services/user-settings.service'

export const useProfile = () => {
	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userSettingsService.findProfile()
	})

	return { user, isLoading }
}
