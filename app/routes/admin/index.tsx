import type {MetaFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {Container} from '~/components/ui/Container'
import {PageHeading} from '~/components/ui/PageHeading'
import {
	OverviewCard,
	OverviewCardContainer,
} from '~/components/ui/overview-card'
import {db} from '~/db.server'

export const meta: MetaFunction = () => ({
	title: 'Overview | Ticket Master',
})

export const loader = async () => {
	const [scheduleCount, orderCount, teamCount, ticketCount, audienceCount] =
		await Promise.all([
			db.schedule.count(),
			db.order.count(),
			db.team.count(),
			db.ticket.count(),
			db.audience.count(),
		])

	return json({
		scheduleCount,
		orderCount,
		teamCount,
		ticketCount,
		audienceCount,
	})
}

export default function AdminOverview() {
	const loaderData = useLoaderData<typeof loader>()

	const adminStats = [
		{
			name: 'Customers',
			stat: loaderData.audienceCount,
		},
		{
			name: 'Orders',
			stat: loaderData.orderCount,
		},
		{
			name: 'Schedules',
			stat: loaderData.scheduleCount,
		},
		{
			name: 'Teams',
			stat: loaderData.teamCount,
		},

		{
			name: 'Tickets',
			stat: loaderData.ticketCount,
		},
	]

	return (
		<>
			<Container>
				<PageHeading title="Overview" />

				<OverviewCardContainer>
					{adminStats.map(item => (
						<OverviewCard key={item.name} name={item.name} stat={item.stat} />
					))}
				</OverviewCardContainer>
			</Container>
		</>
	)
}
