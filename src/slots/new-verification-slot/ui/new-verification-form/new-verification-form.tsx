'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { AuthCard } from '@/entities/auth'

import { Loader } from '@/shared/ui/loader'

import { useVerificationMutation } from '../../api/hooks/use-verification-mutation'

export const NewVerificationForm = () => {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const { verification } = useVerificationMutation()

	useEffect(() => {
		verification(token)
	}, [token])

	return (
		<AuthCard heading='Подтверждение почты'>
			<div>
				<Loader />
			</div>
		</AuthCard>
	)
}
