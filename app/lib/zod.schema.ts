import slugify from 'slugify'
import {z} from 'zod'
import {Role} from '~/utils/constants'

const name = z.string().min(1, 'Name is required')
const email = z.string().email('Invalid email')
const password = z.string().min(8, 'Password must be at least 8 characters')

export const LoginSchema = z.object({
	email,
	password,
	remember: z.enum(['on']).optional(),
	role: z.nativeEnum(Role).optional(),
	redirectTo: z.string().default('/'),
})

export const RegisterUserSchema = z
	.object({
		firstName: name,
		lastName: name,
		email,
		password,
		phoneNo: z.string().min(10, 'Phone number must be 10 digits'),
		city: z.string().min(1, 'City is required'),
		state: z.string().min(1, 'State is required'),
		zipCode: z.string().min(1, 'Zip code is required'),
		dob: z
			.string()
			.min(1, 'Date of birth is required')
			.transform(value => new Date(value).toISOString()),
		confirmPassword: password,
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['password', 'confirmPassword'],
	})

export const ManageStadiumSchema = z.object({
	stadiumId: z.string().optional(),
	name: z.string().min(1, 'Name is required'),
	abbr: z
		.string()
		.min(1, 'Abbreviation is required')
		.transform(value =>
			slugify(value, {lower: true, trim: true, replacement: ''})
		),
	size: z.preprocess(
		Number,
		z.number().min(1, 'No of seats must be at least 1')
	),
})

export const ManageTeamSchema = z.object({
	teamId: z.string().optional(),
	name: z.string().min(1, 'Name is required'),
	abbr: z
		.string()
		.min(1, 'Abbreviation is required')
		.transform(value =>
			slugify(value.toUpperCase(), {trim: true, replacement: ''})
		),
})

export const ManageFixtureSchema = z.object({
	fixtureId: z.string().optional(),
	teamOneId: z.string().min(1, 'Host Team is required'),
	teamTwoId: z.string().min(1, 'Away Team is required'),
	stadiumId: z.string().min(1, 'Stadium is required'),
	fixtureDate: z.preprocess(arg => {
		if (typeof arg == 'string' || arg instanceof Date) {
			return new Date(arg)
		}
	}, z.date()),
	stadiumOpenTime: z.preprocess(arg => {
		if (typeof arg == 'string' || arg instanceof Date) {
			return new Date(arg)
		}
	}, z.date()),
	fixtureStartTime: z.preprocess(arg => {
		if (typeof arg == 'string' || arg instanceof Date) {
			return new Date(arg)
		}
	}, z.date()),
	pricePerSeat: z.preprocess(
		Number,
		z.number().min(0, 'Price per ticket must be at least 0')
	),
	fixtureEndTime: z.preprocess(arg => {
		if (typeof arg == 'string' || arg instanceof Date) {
			return new Date(arg)
		}
	}, z.date()),
})
