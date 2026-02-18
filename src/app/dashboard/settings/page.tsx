import { type Metadata } from 'next'

import { UserSettingsSlot } from '@/slots/user-settings'

export const metadata: Metadata = {
	title: 'Настройки профиля'
}

const DashboardSettingsPage = () => {
	return <UserSettingsSlot />
}

export default DashboardSettingsPage
