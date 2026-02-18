'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

interface TansctackQueryProviderProps {
	children: React.ReactNode
}

export const TansctackQueryProvider = ({
	children
}: TansctackQueryProviderProps) => {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
