import { Metadata } from 'next'

import { RegisterForm } from '@/slots/auth-slot'

export const metadata: Metadata = {
	title: 'Создание аккаунта'
}

const RegisterPage = () => {
	return <RegisterForm />
}

export default RegisterPage
