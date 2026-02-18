'use client'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

type ThemeProviderProps = React.ComponentProps<typeof NextThemeProvider>

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
	return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}
