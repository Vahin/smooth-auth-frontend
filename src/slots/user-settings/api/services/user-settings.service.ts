import { type IUser } from '@/entities/auth'

import { api } from '@/shared/api'

import { TypeUserSettingsSchema } from '../../model/schemes/user-settings.schema'

class UserSettingsService {
	public async findProfile() {
		const response = await api.get<IUser>('users/profile')

		return response
	}

	public async updateProfile(body: TypeUserSettingsSchema) {
		const response = await api.patch<IUser>('users/profile', body)

		return response
	}
}

export const userSettingsService = new UserSettingsService()
