'use client'

import { TansctackQueryProvider } from './TanstackQueryProvider'
import { ThemeProvider } from './ThemeProvider'
import { ToastProvider } from './ToastProvider'

interface MainProviderProps {
	children: React.ReactNode
}

export const MainProvider = ({ children }: MainProviderProps) => {
	return (
		<TansctackQueryProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='light'
				enableSystem
				disableTransitionOnChange
				storageKey='uitheme'
			>
				<ToastProvider />
				{children}
			</ThemeProvider>
		</TansctackQueryProvider>
	)
}
