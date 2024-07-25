import type {Audience, Order} from '@prisma/client'
import {PaymentMethod} from '@prisma/client'
import {OrderStatus} from '@prisma/client'
import {PaymentStatus} from '@prisma/client'
import {db} from '~/db.server'
import {createPasswordHash} from '~/utils/misc.server'

export function getAllOrders() {
	return db.order.findMany({
		include: {
			audience: {
				select: {
					firstName: true,
					lastName: true,
					email: true,
				},
			},
			payment: true,
			schedule: {
				include: {
					timeSlot: true,
					teamOne: true,
					teamTwo: true,
					stadium: true,
				},
			},
			tickets: true,
		},
	})
}

export function getOrdersById(audienceId: Audience['id']) {
	return db.order.findMany({
		where: {
			audienceId: audienceId,
		},
		orderBy: [
			{
				status: 'desc',
			},
			{
				createdAt: 'desc',
			},
		],
		include: {
			audience: {
				select: {
					firstName: true,
					lastName: true,
					email: true,
				},
			},
			payment: true,
			schedule: {
				include: {
					timeSlot: true,
					teamOne: true,
					teamTwo: true,
					stadium: true,
				},
			},
			tickets: true,
		},
	})
}

export function cancelOrder(
	orderId: Order['id'],
	status: OrderStatus = OrderStatus.CANCELLED_BY_ADMIN
) {
	return db.$transaction(async tx => {
		const order = await tx.order.findUnique({
			where: {id: orderId},
			select: {
				scheduleId: true,
				noOfTickets: true,
			},
		})

		if (!order) {
			throw new Error('Order not found')
		}

		await tx.schedule.update({
			where: {id: order.scheduleId},
			data: {
				availableSeats: {
					increment: order.noOfTickets,
				},
			},
		})

		await tx.order.update({
			where: {id: orderId},
			data: {
				status,
				tickets: {
					deleteMany: {},
				},
				payment: {
					update: {
						status: PaymentStatus.REFUNDED,
					},
				},
			},
		})
	})
}

const generateSeats = (zone: string, noOfTickets: number, offset = 0) => {
	const seats = []
	const shortZone = zone
		.split(' ')
		.map(word => word.charAt(0))
		.join('')

	// Ensure offset is a number
	const numericOffset = Number.isFinite(offset) ? offset : 0

	for (let i = 1; i <= noOfTickets; i++) {
		seats.push(`${shortZone}${numericOffset + i}`)
	}
	return seats
}

export async function createOrder({
	audienceId,
	fixtureId,
	noOfTickets,
}: {
	audienceId: Audience['id']
	fixtureId: Order['scheduleId']
	noOfTickets: Order['noOfTickets']
}) {
	const fixture = await db.schedule.findUnique({
		where: {id: fixtureId},
		select: {
			pricePerSeat: true,
			stadium: true,
			orders: {
				include: {
					tickets: true,
				},
			},
		},
	})

	if (!fixture) {
		throw new Error('Fixture not found')
	}

	const totalAmount = fixture.pricePerSeat * noOfTickets

	let lastSeat = 0
	const successfulOrders = fixture?.orders.filter(
		o => o.status === OrderStatus.SUCCESS
	)
	if (!successfulOrders || successfulOrders.length === 0) {
		//
	} else {
		const seatsAlloted = successfulOrders
			.map(o => o.tickets.map(t => t.seatNo))
			.flat()
		lastSeat = Math.max(...seatsAlloted.map(seat => Number(seat)))
	}

	const seats = generateSeats(fixture.stadium.name, noOfTickets, lastSeat)

	return db.$transaction(async tx => {
		await tx.schedule.update({
			where: {id: fixtureId},
			data: {
				availableSeats: {
					decrement: noOfTickets,
				},
			},
		})

		return tx.order.create({
			data: {
				audienceId,
				scheduleId: fixtureId,
				noOfTickets,
				status: OrderStatus.SUCCESS,
				tickets: {
					createMany: {
						data: seats.map(seat => ({seatNo: seat})),
					},
				},
				payment: {
					create: {
						audienceId,
						status: PaymentStatus.PAID,
						method: PaymentMethod.CREDIT_CARD,
						amount: totalAmount,
					},
				},
			},
		})
	})
}

export const createWalkInOrder = async ({
	customerCity,
	customerDob,
	customerEmail,
	customerFirstName,
	customerLastName,
	customerPhone,
	customerState,
	customerZipCode,
	fixtureId,
	noOfTickets,
}: {
	customerCity: string
	customerDob: string
	customerEmail: string
	customerFirstName: string
	customerLastName: string
	customerPhone: string
	customerState: string
	customerZipCode: string
	fixtureId: Order['scheduleId']
	noOfTickets: Order['noOfTickets']
}) => {
	const passwordHash = await createPasswordHash('password')
	const audience = await db.audience.upsert({
		where: {
			email: customerEmail,
		},
		update: {
			firstName: customerFirstName,
			lastName: customerLastName,
			email: customerEmail,
			city: customerCity,
			state: customerState,
			zipCode: customerZipCode,
			password: passwordHash,
			phoneNo: customerPhone,
		},
		create: {
			firstName: customerFirstName,
			lastName: customerLastName,
			email: customerEmail,
			city: customerCity,
			state: customerState,
			zipCode: customerZipCode,
			dob: customerDob,
			password: passwordHash,
			phoneNo: customerPhone,
		},
	})

	return createOrder({
		audienceId: audience.id,
		fixtureId,
		noOfTickets,
	})
}
