import z from 'zod'

export const resetPasswordSchema = z.object({
	email: z.email({
		message: 'Некорректная почта'
	})
})

export type TypeResetPasswordSchema = z.infer<typeof resetPasswordSchema>
