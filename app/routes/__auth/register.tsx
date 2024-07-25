import {Button, PasswordInput, TextInput} from '@mantine/core'
import {DatePicker} from '@mantine/dates'
import {json, type ActionFunction} from '@remix-run/node'
import {Link, useFetcher} from '@remix-run/react'
import {createAudience} from '~/lib/audience.server'
import {getUserByEmail} from '~/lib/user.server'
import {RegisterUserSchema} from '~/lib/zod.schema'
import {createUserSession} from '~/session.server'
import {Role} from '~/utils/constants'
import {badRequest} from '~/utils/misc.server'
import type {inferErrors} from '~/utils/validation'
import {validateAction} from '~/utils/validation'

interface ActionData {
	fieldErrors?: inferErrors<typeof RegisterUserSchema>
}

export const action: ActionFunction = async ({request}) => {
	const {fieldErrors, fields} = await validateAction(
		request,
		RegisterUserSchema
	)
	if (fieldErrors) {
		return badRequest<ActionData>({fieldErrors})
	}

	const {email} = fields

	const existingUser = await getUserByEmail(email)
	if (existingUser) {
		return badRequest<ActionData>({
			fieldErrors: {email: 'A user already exists with this email'},
		})
	}

	const user = await createAudience(fields)
	return createUserSession({
		request,
		userId: user.id,
		role: Role.AUDIENCE,
		redirectTo: '/',
	})

	return json({success: true})
}
export default function Register() {
	const fetcher = useFetcher<ActionData>()
	const isSubmitting = fetcher.state !== 'idle'

	return (
		<>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">New here?</h1>
					<p className="text-muted-foreground text-sm">
						Enter your details below to create an account
					</p>
				</div>

				<fetcher.Form replace method="post" className="mt-8">
					<fieldset disabled={isSubmitting} className="flex flex-col gap-4">
						<TextInput
							name="firstName"
							autoComplete="given-name"
							label="First name"
							error={fetcher.data?.fieldErrors?.firstName}
							required
						/>
						<TextInput
							name="lastName"
							autoComplete="given-name"
							label="Last name"
							error={fetcher.data?.fieldErrors?.lastName}
							required
						/>

						<TextInput
							name="email"
							type="email"
							autoComplete="email"
							label="Email address"
							error={fetcher.data?.fieldErrors?.email}
							required
						/>

						<PasswordInput
							name="password"
							label="Password"
							error={fetcher.data?.fieldErrors?.password}
							autoComplete="current-password"
							required
						/>

						<PasswordInput
							name="confirmPassword"
							label="Confirm password"
							error={fetcher.data?.fieldErrors?.password}
							autoComplete="current-password"
							required
						/>

						<TextInput
							name="phoneNo"
							type="tel"
							autoComplete="tel-national"
							label="Phone number"
							error={fetcher.data?.fieldErrors?.phoneNo}
							required
						/>

						<TextInput
							name="city"
							label="City"
							error={fetcher.data?.fieldErrors?.city}
							required
						/>

						<TextInput
							name="state"
							label="State"
							error={fetcher.data?.fieldErrors?.state}
							required
						/>

						<TextInput
							name="zipCode"
							label="Zip code"
							error={fetcher.data?.fieldErrors?.zipCode}
							required
						/>

						<DatePicker
							name="dob"
							label="Date of birth"
							error={fetcher.data?.fieldErrors?.dob}
							required
						/>

						<div className="my-4 flex items-center justify-end">
							<Link
								to="/login"
								prefetch="intent"
								className="font-roboto text-sm font-semibold text-blue-500 hover:underline"
							>
								Already have an account? Login
							</Link>
						</div>
						<Button
							type="submit"
							loading={isSubmitting}
							fullWidth
							loaderPosition="right"
							mt="1rem"
						>
							Register
						</Button>
					</fieldset>
				</fetcher.Form>
			</div>
		</>
	)
}
