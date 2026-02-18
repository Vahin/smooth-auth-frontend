import { Metadata } from 'next'

import { ResetPasswordSlot } from '@/slots/recovery-password'

export const metadata: Metadata = {
	title: 'Сброс пароля'
}

const ResetPasswordPage = () => {
	return <ResetPasswordSlot />
}

export default ResetPasswordPage
