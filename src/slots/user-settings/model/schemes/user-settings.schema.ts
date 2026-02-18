import z from 'zod'

export const userSettingsSchema = z.object({
	name: z.string().min(1, { message: 'Введите имя' }),
	email: z.email({ message: 'Некорректная почта' }),
	isTwoFactorEnabled: z.boolean()
})

export type TypeUserSettingsSchema = z.infer<typeof userSettingsSchema>
