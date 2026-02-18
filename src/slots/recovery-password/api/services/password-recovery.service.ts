import { IUser } from '@/entities/auth'

// TODO: Решить какое расположение для интерфейса IUser будет верным

import { api } from '@/shared/api'

import { TypeNewPasswordSchema } from '../../model/schemas/new-password.schema'
import { TypeResetPasswordSchema } from '../../model/schemas/reset-password.schema'

class PassworRecoveryService {
	public async reset(body: TypeResetPasswordSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>(
			'auth/password-recovery/reset',
			body,
			{
				headers
			}
		)

		return response
	}

	public async new(
		body: TypeNewPasswordSchema,
		token: string | null,
		recaptcha?: string
	) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>(
			`auth/password-recovery/new/${token}`,
			body,
			{
				headers
			}
		)

		return response
	}
}

export const passworRecoveryService = new PassworRecoveryService()
