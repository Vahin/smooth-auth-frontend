import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { MainProvider } from '@/shared/providers'
import '@/shared/styles/globals.css'
import { ThemeToggler } from '@/shared/ui/ThemeToggler'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: 'Курс по авторизации',
		template: '%s | Курс по авторизации'
	},
	description:
		'Это учебный проект, созданный для демонстрации полного цикла авторизации пользователей'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<MainProvider>
					<div className='relative flex min-h-screen flex-col pt-2'>
						<div className='flex w-full items-end justify-end px-4'>
							<ThemeToggler />
						</div>
						<div className='v-full flex h-screen items-center justify-center px-4'>
							{children}
						</div>
					</div>
				</MainProvider>
			</body>
		</html>
	)
}
