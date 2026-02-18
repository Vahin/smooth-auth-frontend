import { Metadata } from 'next'

import { LoginForm } from '@/slots/auth-slot'

export const metadata: Metadata = {
	title: 'Войти в аккаунт'
}

const LoginPage = () => {
	return <LoginForm />
}

export default LoginPage
