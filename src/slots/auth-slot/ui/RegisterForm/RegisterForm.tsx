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

import { useRegisterMutation } from '../../model/hooks/use-register-mutation'
import {
	registerSchema,
	TypeRegisterSchema
} from '../../model/schemas/register.schema'
import { AuthSocial } from '../AuthSocial/AuthSocial'

export const RegisterForm = () => {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<TypeRegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	})

	const { register, isLoadingRegister } = useRegisterMutation()

	const onSubmit = (values: TypeRegisterSchema) => {
		if (recaptchaValue) {
			register({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('ReCaptcha Error')
		}
	}

	return (
		<AuthCard
			heading='Регистрация'
			description='Чтобы войти на сайт введите Ваш email и пароль'
			backButtonLabel='Уже есть аккаунт? Войти'
			backButtonHref='/auth/login'
			AuthSocial={<AuthSocial />}
		>
			<form id='register-form' onSubmit={form.handleSubmit(onSubmit)}>
				<FieldGroup>
					<Controller
						name='name'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor='register-form-name'>
									Имя
								</FieldLabel>
								<Input
									{...field}
									id='register-form-name'
									aria-invalid={fieldState.invalid}
									disabled={isLoadingRegister}
									placeholder='Иван'
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Controller
						name='email'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor='register-form-email'>
									Почта
								</FieldLabel>
								<Input
									{...field}
									id='register-form-email'
									aria-invalid={fieldState.invalid}
									placeholder='ivan@example.com'
									disabled={isLoadingRegister}
									type='email'
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Controller
						name='password'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor='register-form-password'>
									Пароль
								</FieldLabel>
								<Input
									{...field}
									id='register-form-password'
									aria-invalid={fieldState.invalid}
									placeholder='********'
									disabled={isLoadingRegister}
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
								<FieldLabel htmlFor='register-form-password-repeat'>
									Повторите пароль
								</FieldLabel>
								<Input
									{...field}
									id='register-form-password-repeat'
									aria-invalid={fieldState.invalid}
									placeholder='********'
									disabled={isLoadingRegister}
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
						form='register-form'
						disabled={isLoadingRegister}
					>
						Зарегестрироваться
					</Button>
				</FieldGroup>
			</form>
		</AuthCard>
	)
}
