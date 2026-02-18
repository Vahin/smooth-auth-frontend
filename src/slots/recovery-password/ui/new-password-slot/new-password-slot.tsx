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

import { useNewPasswordMutation } from '../../api/hooks/use-new-password-mutation'
import {
	newPasswordSchema,
	TypeNewPasswordSchema
} from '../../model/schemas/new-password.schema'

export const NewPasswordSlot = () => {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<TypeNewPasswordSchema>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: '',
			passwordRepeat: ''
		}
	})

	const { setNewPassword, isSetNewPasswordLoading } = useNewPasswordMutation()

	const onSubmit = (values: TypeNewPasswordSchema) => {
		if (recaptchaValue) {
			setNewPassword({
				values,
				recaptcha: recaptchaValue
			})
		} else {
			toast.error('ReCaptcha Error')
		}
	}

	return (
		<AuthCard
			heading='Новый пароль'
			description='Введите новый пароль'
			backButtonLabel='Войти в аккаунт'
			backButtonHref='/auth/login'
		>
			<form id='new-password-form' onSubmit={form.handleSubmit(onSubmit)}>
				<FieldGroup>
					<Controller
						name='password'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor='new-password-form-password'>
									Новый пароль
								</FieldLabel>
								<Input
									{...field}
									id='new-password-form-password'
									aria-invalid={fieldState.invalid}
									disabled={isSetNewPasswordLoading}
									placeholder='******'
									type='password'
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Controller
						name='passwordRepeat'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor='new-password-form-password-repeat'>
									Новый пароль
								</FieldLabel>
								<Input
									{...field}
									id='new-password-form-password-repeat'
									aria-invalid={fieldState.invalid}
									disabled={isSetNewPasswordLoading}
									placeholder='******'
									type='password'
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
						form='new-password-form'
						disabled={isSetNewPasswordLoading}
					>
						Войти
					</Button>
				</FieldGroup>
			</form>
		</AuthCard>
	)
}

// TODO: Рассмотреть возможность сделать роут серверным, используя не useSearchParams, а используя пути next => Promise<Params>
