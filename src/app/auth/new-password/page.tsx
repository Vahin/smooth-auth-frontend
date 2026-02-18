import { Metadata } from 'next'

import { NewPasswordSlot } from '@/slots/recovery-password'

const metadata: Metadata = {
	title: 'Новый пароль'
}

const NewPasswordPage = () => <NewPasswordSlot />

export default NewPasswordPage
