'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'

import { Button } from '@/shared/ui/button'
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle
} from '@/shared/ui/card'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel
} from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { Loader } from '@/shared/ui/loader'
import { Switch } from '@/shared/ui/switch'

import { useProfile } from '../../api/hooks/use-profile'
import { useUpdateProfileMutation } from '../../api/hooks/use-update-profile-mutation'
import {
	TypeUserSettingsSchema,
	userSettingsSchema
} from '../../model/schemes/user-settings.schema'
import { UserButton } from '../user-button/user-button'
import { UserButtonSkeleton } from '../user-button/user-button.skeleton'

export const UserSettingsSlot = () => {
	const { user, isLoading } = useProfile()

	const { update, isLoadingUpdate } = useUpdateProfileMutation()

	if (!user && !isLoading) return null

	const form = useForm<TypeUserSettingsSchema>({
		resolver: zodResolver(userSettingsSchema),
		values: {
			name: user?.displayName || '',
			email: user?.email || '',
			isTwoFactorEnabled: user?.isTwoFactorEnabled || false
		}
	})

	const onSubmit = (values: TypeUserSettingsSchema) => {
		update(values)
	}

	return (
		<Card className='w-100'>
			<CardHeader>
				<CardTitle className='flex h-8 items-center'>
					Настройки профиля
				</CardTitle>
				<CardAction>
					{isLoading || !user ? (
						<UserButtonSkeleton />
					) : (
						<UserButton user={user} />
					)}
				</CardAction>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Loader />
				) : (
					<form
						id='settings-form'
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FieldGroup>
							<Controller
								name='name'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor='settings-form-name'>
											Имя
										</FieldLabel>
										<Input
											{...field}
											id='settings-form-name'
											aria-invalid={fieldState.invalid}
											disabled={isLoadingUpdate}
											placeholder='Имя'
											type='name'
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
								name='email'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor='settings-form-email'>
											Почта
										</FieldLabel>
										<Input
											{...field}
											id='settings-form-email'
											aria-invalid={fieldState.invalid}
											disabled={isLoadingUpdate}
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
								name='isTwoFactorEnabled'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field
										data-invalid={fieldState.invalid}
										orientation={'horizontal'}
									>
										<div className='flex flex-col gap-0.5'>
											<FieldLabel htmlFor='settings-form-two-factor'>
												Двухфакторная аутентификация
											</FieldLabel>
											<FieldDescription>
												Включите двухфакторную
												аутентификацию для Вашей учетной
												записи.
											</FieldDescription>
										</div>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
											id='settings-form-two-factor'
											disabled={isLoadingUpdate}
										/>
									</Field>
								)}
							/>

							<Button
								type='submit'
								form='settings-form'
								disabled={isLoadingUpdate}
							>
								Сохранить
							</Button>
						</FieldGroup>
					</form>
				)}
			</CardContent>
		</Card>
	)
}
