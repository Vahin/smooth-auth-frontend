'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FaGoogle, FaYandex } from 'react-icons/fa'

import { Button } from '@/shared/ui/button'

import { authService } from '../../api/services/auth.service'

interface AuthSocialProps {}

export const AuthSocial = (props: AuthSocialProps) => {
	const router = useRouter()

	const { mutateAsync } = useMutation({
		mutationKey: ['ouath by provider'],
		mutationFn: async (provider: 'google' | 'yandex') =>
			await authService.oAuthByProvider(provider)
	})

	const onClick = async (provider: 'google' | 'yandex') => {
		const response = await mutateAsync(provider)

		if (response) {
			router.push(response.url)
		}
	}

	return (
		<>
			<div className='mb-4 grid grid-cols-2 gap-6'>
				<Button variant='outline' onClick={() => onClick('google')}>
					<FaGoogle className='mr-1 size-4' />
					Google
				</Button>
				<Button variant='outline' onClick={() => onClick('yandex')}>
					<FaYandex className='mr-1 size-4' />
					Яндекс
				</Button>
			</div>
			<div className='relative mb-2 space-y-4'>
				<div className='absolute inset-0 top-2 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background text-muted-foreground px-2'>
						Или
					</span>
				</div>
			</div>
		</>
	)
}
