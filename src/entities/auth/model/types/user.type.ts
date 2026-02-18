export enum UserRole {
	REGULAR = 'REGULAR',
	ADMIN = 'ADMIN'
}

export enum AuthMethod {
	CREDENTIALS = 'CREDENTIALS',
	GOOGLE = 'GOOGLE',
	YANDEX = 'YANDEX'
}

export interface IAccount {
	id: string
	createdAt: string
	updatedAt: string
	type: string
	provider: string
	refreshToken: string
	accessToken: string
	expiresAt: number
	userId: string
}

export interface IUser {
	id: string
	createdAt: string
	updatedAt: string
	email: string
	password: string
	displayName: string
	picture: string
	role: UserRole
	isVerified: boolean
	isTwoFactorEnabled: boolean
	method: AuthMethod
	accounts: IAccount[]
}
