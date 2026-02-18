import { api } from '@/shared/api'

import { TypeLoginSchema } from '../../model/schemas/login.schema'
import { TypeRegisterSchema } from '../../model/schemas/register.schema'
import { IUser } from '../../model/types/user.type'

class AuthService {
	public async register(body: TypeRegisterSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>('auth/register', body, {
			headers
		})

		return response
	}

	public async login(body: TypeLoginSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>('auth/login', body, {
			headers
		})

		return response
	}

	public async oAuthByProvider(provider: 'google' | 'yandex') {
		const response = api.get<{ url: string }>(
			`auth/oauth/connect/${provider}`
		)

		return response
	}

	public async logout() {
		const response = await api.post('auth/logout')

		return response
	}
}

export const authService = new AuthService()
