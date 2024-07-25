import {CalendarDaysIcon, CreditCardIcon} from '@heroicons/react/20/solid'
import {CurrencyDollarIcon, TicketIcon} from '@heroicons/react/24/solid'
import {
	Button,
	Group,
	Input,
	Modal,
	NumberInput,
	Select,
	Text,
} from '@mantine/core'
import type {LoaderArgs, SerializeFrom} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useFetcher, useLoaderData, useNavigate} from '@remix-run/react'
import {
	AlarmClockIcon,
	ArrowRightIcon,
	BuildingIcon,
	CalendarRangeIcon,
	ClockIcon,
} from 'lucide-react'
import * as React from 'react'
import {EmptyState} from '~/components/ui/EmptyState'
import {PageHeading} from '~/components/ui/PageHeading'
import {getAllUpcomingFixtures} from '~/lib/fixture.server'

import {DatePicker} from '@mantine/dates'
import {useDisclosure} from '@mantine/hooks'
import {PaymentMethod, Schedule} from '@prisma/client'
import ReactInputMask from 'react-input-mask'
import {formatCurrency, formatDate, formatTime, titleCase} from '~/utils/misc'
const actions = [
	{
		title: 'Tickets',
		description: 'Book and view your ticket history',
		href: 'tickets',
		icon: TicketIcon,
	},
	{
		title: 'Payment History',
		description: 'View payment history',
		href: 'payment-history',
		icon: CurrencyDollarIcon,
	},
]

export const loader = async ({request}: LoaderArgs) => {
	const upcomingFixtures = await getAllUpcomingFixtures()
	return json({upcomingFixtures})
}

export default function CustomerOverview() {
	const {upcomingFixtures} = useLoaderData<typeof loader>()

	return (
		<>
			<div className="flex max-w-screen-xl flex-col gap-12 p-10">
				<div className="flex flex-col gap-8">
					<PageHeading title="Overview" />

					{upcomingFixtures.length > 0 ? (
						<div className="grid grid-cols-3 gap-8">
							{upcomingFixtures.map(fixture => (
								<Card key={fixture.id} fixture={fixture} />
							))}
						</div>
					) : (
						<EmptyState
							label="No upcoming matches, check back later"
							icon={<CalendarRangeIcon size={70} className="text-gray-600" />}
						/>
					)}
				</div>
			</div>
		</>
	)
}

export function Card({
	fixture,
}: {
	fixture: SerializeFrom<typeof loader>['upcomingFixtures'][0]
}) {
	// const priceRange = formatCurrency(fixture.stadium.pricePerSeat)
	const navigate = useNavigate()
	const {upcomingFixtures} = useLoaderData<typeof loader>()

	const fetcher = useFetcher()
	const id = React.useId()

	const [selectedFixtureId, setSelectedFixtureId] = React.useState<
		Schedule['id'] | null
	>(fixture.id)

	const [selectedFixture, setSelectedFixture] =
		React.useState<typeof upcomingFixtures[number]>()
	const [noOfTickets, setNoOfTickets] = React.useState<number | undefined>(1)

	const [isModalOpen, handleModal] = useDisclosure(false, {
		onClose: () => {
			setSelectedFixtureId(null)
			setNoOfTickets(1)
		},
	})

	const isSubmitting = fetcher.state !== 'idle'

	const totalPrice = React.useMemo(() => {
		if (!selectedFixture || !noOfTickets) return 0

		return selectedFixture.pricePerSeat * noOfTickets
	}, [selectedFixture, noOfTickets])

	React.useEffect(() => {
		if (!selectedFixtureId) return
		setSelectedFixture(upcomingFixtures.find(f => f.id === selectedFixtureId))
	}, [selectedFixtureId, upcomingFixtures])

	React.useEffect(() => {
		if (isSubmitting) return
		if (!fetcher.data) return

		console.log(fetcher.data)

		if (fetcher.data.success) {
			handleModal.close()
			navigate('/tickets')
		}
		// handleModal is not memoized, so we don't need to add it to the dependency array
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetcher.data, isSubmitting])

	return (
		<>
			<div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5">
				<dl className="flex flex-wrap">
					<div className="flex-auto pl-6 pt-6">
						<dt className="text-base font-semibold leading-6 text-gray-900">
							{fixture.teamOne.abbr.toUpperCase()} vs{' '}
							{fixture.teamTwo.abbr.toUpperCase()}
						</dt>
					</div>

					<div className="mt-8 flex w-full flex-none gap-x-4 px-6">
						<dt className="flex-none">
							<span className="sr-only">Due date</span>
							<CalendarDaysIcon
								className="h-6 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</dt>
						<dd className="flex items-center gap-4 text-sm leading-6 text-gray-500">
							<span>{formatDate(fixture.timeSlot?.date!)}</span>
						</dd>
					</div>
					<div className="mt-4 flex w-full flex-none gap-x-4 px-6">
						<dt className="flex-none">
							<span className="sr-only">Time</span>
							<ClockIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
						</dt>
						<dd className="text-sm leading-6 text-gray-500">
							<span>
								{formatTime(fixture.timeSlot?.start!)} -{' '}
								{formatTime(fixture.timeSlot?.end!)}
							</span>
						</dd>
					</div>
					<div className="mt-4 flex w-full flex-none gap-x-4 px-6">
						<dt className="flex-none">
							<span className="sr-only">Status</span>
							<BuildingIcon
								className="h-6 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</dt>
						<dd className="text-sm leading-6 text-gray-500">
							{fixture.stadium.name}
						</dd>
					</div>

					<div className="mt-4 flex w-full flex-none gap-x-4 px-6">
						<dt className="flex-none">
							<span className="sr-only">Available Tickets</span>
							<TicketIcon
								className="h-6 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</dt>
						<dd className="text-sm leading-6 text-gray-500">
							{fixture.availableSeats > 0
								? `${fixture.availableSeats} seats available`
								: 'Sold out'}
						</dd>
					</div>

					<div className="mt-4 flex w-full flex-none gap-x-4 px-6">
						<dt className="flex-none">
							<span className="sr-only">Stadium Opens At</span>
							<AlarmClockIcon
								className="h-6 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</dt>
						<dd className="text-sm leading-6 text-gray-500">
							Stadium opens at {formatTime(fixture.stadiumOpenTime)}
						</dd>
					</div>
				</dl>
				<div className="mt-6 border-t border-gray-900/5 px-6 py-6">
					<Button
						variant="white"
						disabled={fixture.availableSeats === 0}
						compact
						onClick={() => handleModal.open()}
						rightIcon={<ArrowRightIcon size={16} />}
					>
						{fixture.availableSeats > 0 ? 'Buy tickets' : 'Sold out'}
					</Button>
				</div>
			</div>

			<Modal
				opened={isModalOpen}
				onClose={() => handleModal.close()}
				title="Buy tickets"
				centered
				overlayBlur={1.2}
				overlayOpacity={0.6}
			>
				<fetcher.Form method="post" replace action="/tickets">
					<fieldset disabled={isSubmitting} className="flex flex-col gap-4">
						<Select
							name="fixtureId"
							label="Fixture"
							itemComponent={SelectItem}
							value={selectedFixtureId}
							onChange={e => setSelectedFixtureId(e)}
							data={upcomingFixtures.map(f => ({
								fixtureDate: f.timeSlot?.date,
								fixtureStartTime: f.timeSlot?.start,
								fixtureEndTime: f.timeSlot?.end,
								stadium: f.stadium?.name,
								teamOne: f.teamOne?.name,
								teamTwo: f.teamTwo?.name,
								label: `${f.teamOne?.name} vs ${f.teamTwo?.name}`,
								value: f.id,
							}))}
							error={fetcher.data?.fieldErrors?.fixtureId}
							readOnly
							required
						/>

						<NumberInput
							name="noOfTickets"
							label="No of tickets"
							value={noOfTickets}
							max={fixture.availableSeats}
							onChange={e => setNoOfTickets(e)}
							error={fetcher.data?.fieldErrors?.noOfTickets}
							min={1}
							required
						/>

						<p className="text-sm">Available Seats: {fixture.availableSeats}</p>

						<p className="text-sm">
							{totalPrice ? `Total price: ${formatCurrency(totalPrice)}` : null}
						</p>

						<Select
							label="Payment method"
							clearable={false}
							required
							defaultValue={PaymentMethod.CREDIT_CARD}
							data={Object.values(PaymentMethod).map(method => ({
								label: titleCase(method.replace(/_/g, ' ')),
								value: method,
							}))}
						/>

						<Input.Wrapper id={id} label="Credit card number" required>
							<Input
								id={id}
								component={ReactInputMask}
								mask="9999 9999 9999 9999"
								placeholder="XXXX XXXX XXXX XXXX"
								alwaysShowMask={false}
								defaultValue={'4242 4242 4242 4242'}
							/>
						</Input.Wrapper>

						<div className="flex items-center gap-4">
							<Input.Wrapper id={id + 'cvv'} label="CVV" required>
								<Input
									id={id + 'cvv'}
									name="cvv"
									component={ReactInputMask}
									mask="999"
									placeholder="XXX"
									defaultValue={'123'}
									alwaysShowMask={false}
								/>
							</Input.Wrapper>

							<Input.Wrapper id={id + 'cvv'} label="Expiry" required>
								<Input
									id={id + 'expiryDate'}
									name="expiryDate"
									component={ReactInputMask}
									mask="99/9999"
									placeholder="MM/YYYY"
									alwaysShowMask={false}
									defaultValue={'12/2029'}
								/>
							</Input.Wrapper>
						</div>

						<div className="mt-1 flex items-center justify-end gap-4">
							<Button
								variant="subtle"
								disabled={isSubmitting}
								onClick={() => handleModal.close()}
								color="red"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								loading={isSubmitting}
								loaderPosition="right"
							>
								Buy tickets
							</Button>
						</div>
					</fieldset>
				</fetcher.Form>
			</Modal>
		</>
	)
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
	fixtureDate: string
	fixtureStartTime: string
	fixtureEndTime: string
	teamOne: string
	teamTwo: string
	stadium: string
	label: string
}

const SelectItem = React.forwardRef<HTMLDivElement, ItemProps>(
	(props: ItemProps, ref) => {
		const {
			teamOne,
			teamTwo,
			fixtureDate,
			fixtureStartTime,
			fixtureEndTime,
			stadium,
			...others
		} = props
		return (
			<div ref={ref} {...others}>
				<Group noWrap>
					<div>
						<Text size="sm">
							{teamOne} vs {teamTwo}
						</Text>
						<Text size="xs" opacity={0.65}>
							{stadium}
						</Text>
						<Text size="xs" opacity={0.65}>
							{formatDate(fixtureDate)} ({formatTime(fixtureStartTime)} -{' '}
							{formatTime(fixtureEndTime)})
						</Text>
					</div>
				</Group>
			</div>
		)
	}
)
