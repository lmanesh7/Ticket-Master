import {PrismaClient} from '@prisma/client'
import {createPasswordHash} from '~/utils/misc.server'

const db = new PrismaClient()

async function seed() {
	await db.admin.deleteMany()
	await db.audience.deleteMany()
	await db.timeSlot.deleteMany()
	await db.stadium.deleteMany()
	await db.team.deleteMany()
	await db.ticket.deleteMany()

	const [] = await Promise.all([
		db.admin.create({
			data: {
				firstName: 'Admin',
				lastName: 'User',
				email: 'admin@app.com',
				password: await createPasswordHash('password'),
			},
		}),
		db.audience.create({
			data: {
				firstName: 'Customer',
				lastName: 'User',
				email: 'customer@app.com',
				phoneNo: '1234567890',
				city: 'City',
				dob: new Date('1990-01-01'),
				state: 'State',
				zipCode: '12345',
				password: await createPasswordHash('password'),
			},
		}),
		db.team.create({
			data: {
				name: 'New England Patriots',
				abbr: 'NE',
			},
		}),
		db.team.create({
			data: {
				name: 'Dallas Cowboys',
				abbr: 'DAL',
			},
		}),
		db.stadium.create({
			data: {
				name: 'Gillette Stadium',
				abbr: 'GS',
				size: 65878,
			},
		}),
	])

	await db.team.createMany({
		data: seedTeams,
	})

	await db.stadium.create({
		data: {
			name: 'AT&T Stadium',
			abbr: 'ATS',
			size: 80000,
		},
	})

	console.log(`Database has been seeded. 🌱`)
}

seed()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await db.$disconnect()
	})

const seedTeams = [
	{
		name: 'Green Bay Packers',
		abbr: 'GB',
	},
	{
		name: 'Pittsburgh Steelers',
		abbr: 'PIT',
	},
	{
		name: 'San Francisco 49ers',
		abbr: 'SF',
	},
	{
		name: 'Kansas City Chiefs',
		abbr: 'KC',
	},
	{
		name: 'New Orleans Saints',
		abbr: 'NO',
	},
	{
		name: 'Seattle Seahawks',
		abbr: 'SEA',
	},
	{
		name: 'Philadelphia Eagles',
		abbr: 'PHI',
	},
	{
		name: 'Los Angeles Rams',
		abbr: 'LAR',
	},
]
