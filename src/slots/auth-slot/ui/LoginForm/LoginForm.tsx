'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthCard } from '@/entities/auth'

import { Button } from '@/shared/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

import { useLoginMutation } from '../../model/hooks/use-login-mutation'
import { loginSchema, TypeLoginSchema } from '../../model/schemas/login.schema'
import { AuthSocial } from '../AuthSocial/AuthSocial'

export const LoginForm = () => {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
	const [isShowTwoFactor, setIsShowTwoFactor] = useState(false)

	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
			code: ''
		}
	})

	const { login, isLoadingLogin } = useLoginMutation(setIsShowTwoFactor)

	const onSubmit = (values: TypeLoginSchema) => {
		if (recaptchaValue) {
			login({
				values,
				recaptcha: recaptchaValue
			})
		} else {
			toast.error('ReCaptcha Error')
		}
	}

	return (
		<AuthCard
			heading='Войти'
			description='Чтобы войти на сайт введите Ваш email и пароль'
			backButtonLabel='Еще нет аккаунта? Регистрация'
			backButtonHref='/auth/register'
			AuthSocial={<AuthSocial />}
		>
			<form id='login-form' onSubmit={form.handleSubmit(onSubmit)}>
				<FieldGroup>
					{isShowTwoFactor && (
						<Controller
							name='code'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='login-form-code'>
										Код
									</FieldLabel>
									<Input
										{...field}
										id='login-form-code'
										aria-invalid={fieldState.invalid}
										disabled={isLoadingLogin}
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
					)}
					{!isShowTwoFactor && (
						<>
							<Controller
								name='email'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor='login-form-email'>
											Почта
										</FieldLabel>
										<Input
											{...field}
											id='login-form-email'
											aria-invalid={fieldState.invalid}
											disabled={isLoadingLogin}
											placeholder='ivan@example.com'
											type='email'
										/>
										{fieldState.invalid && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>

							<Controller
								name='password'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<div className='flex items-center justify-between'>
											<FieldLabel htmlFor='login-form-password'>
												Пароль
											</FieldLabel>
											<Link
												href='/auth/reset-password'
												className='ml-auto inline-block text-sm underline'
											>
												Забыли пароль?
											</Link>
										</div>
										<Input
											{...field}
											id='login-form-password'
											aria-invalid={fieldState.invalid}
											disabled={isLoadingLogin}
											placeholder='********'
											type='password'
										/>
										{fieldState.invalid && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>
						</>
					)}

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
						form='login-form'
						disabled={isLoadingLogin}
					>
						Войти
					</Button>
				</FieldGroup>
			</form>
		</AuthCard>
	)
}
