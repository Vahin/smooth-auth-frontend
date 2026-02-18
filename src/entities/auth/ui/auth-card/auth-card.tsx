import Link from 'next/link'

import { Button } from '@/shared/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/ui/card'

interface AuthCardProps {
	children: React.ReactNode
	heading?: string
	description?: string
	backButtonLabel?: string
	backButtonHref?: string
	AuthSocial?: React.ReactNode
}

export const AuthCard = (props: AuthCardProps) => {
	const {
		children,
		heading,
		description,
		backButtonLabel,
		backButtonHref,
		AuthSocial
	} = props

	return (
		<Card className='w-100'>
			<CardHeader className='space-y-2'>
				<CardTitle>{heading}</CardTitle>
				{description && (
					<CardDescription>{description}</CardDescription>
				)}
			</CardHeader>
			<CardContent>
				{AuthSocial ? AuthSocial : null}
				{children}
			</CardContent>
			<CardFooter>
				{backButtonLabel && backButtonHref && (
					<Button variant={'link'} className='w-full font-normal'>
						<Link href={backButtonHref}>{backButtonLabel}</Link>
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}
