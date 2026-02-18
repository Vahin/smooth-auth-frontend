import { Metadata } from 'next'

import { NewVerificationSlot } from '@/slots/new-verification-slot'

export const metadata: Metadata = {
	title: 'Подтверждение почты'
}

const NewVerificationPage = () => {
	return <NewVerificationSlot />
}

export default NewVerificationPage
