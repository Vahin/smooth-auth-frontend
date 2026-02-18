'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthCard } from '@/entities/auth'

import { Button } from '@/shared/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

import { useResetPasswordMutation } from '../../api/hooks/use-reset-password-mutation'
import {
	resetPasswordSchema,
	TypeResetPasswordSchema
} from '../../model/schemas/reset-password.schema'

export const ResetPasswordSlot = () => {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<TypeResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: ''
		}
	})

	const { reset, isLoadingReset } = useResetPasswordMutation()

	const onSubmit = (values: TypeResetPasswordSchema) => {
		if (recaptchaValue) {
			reset({
				values,
				recaptcha: recaptchaValue
			})
		} else {
			toast.error('ReCaptcha Error')
		}
	}

	return (
		<AuthCard
			heading='Сброс пароля'
			description='Для сброса пароля введите свою почту'
			backButtonLabel='Войти в аккаунт'
			backButtonHref='/auth/login'
		>
			<form id='reset-form' onSubmit={form.handleSubmit(onSubmit)}>
				<FieldGroup>
					<Controller
						name='email'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor='reset-form-email'>
									Почта
								</FieldLabel>
								<Input
									{...field}
									id='reset-form-email'
									aria-invalid={fieldState.invalid}
									disabled={isLoadingReset}
									placeholder='ivan@example.com'
									type='email'
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<div className='flex justify-center'>
						<ReCAPTCHA
							sitekey={
								process.env.GOOGLE_RECAPTCHA_SITE_KEY as string
							}
							onChange={setRecaptchaValue}
							theme={theme === 'light' ? 'light' : 'dark'}
						/>
					</div>

					<Button
						type='submit'
						form='reset-form'
						disabled={isLoadingReset}
					>
						Войти
					</Button>
				</FieldGroup>
			</form>
		</AuthCard>
	)
}
