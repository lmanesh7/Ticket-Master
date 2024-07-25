import type {Audience} from '@prisma/client'
import {db} from '~/db.server'
import {createPasswordHash} from '~/utils/misc.server'

export async function createAudience({
	city,
	dob,
	email,
	firstName,
	lastName,
	password,
	phoneNo,
	state,
	zipCode,
}: {
	city: Audience['city']
	dob: string
	email: Audience['email']
	firstName: Audience['firstName']
	lastName: Audience['lastName']
	password: string
	phoneNo: Audience['phoneNo']
	state: Audience['state']
	zipCode: Audience['zipCode']
}) {
	const passwordHash = await createPasswordHash(password)

	return db.audience.create({
		data: {
			city,
			dob,
			email,
			firstName,
			lastName,
			password: passwordHash,
			phoneNo,
			state,
			zipCode,
		},
	})
}

export function getAudienceDetails(id: Audience['id']) {
	return db.audience.findUnique({
		where: {id},
		include: {},
	})
}
