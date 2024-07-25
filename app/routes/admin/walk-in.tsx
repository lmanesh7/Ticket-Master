import {
	Button,
	Group,
	Input,
	NumberInput,
	Select,
	Text,
	TextInput,
} from '@mantine/core'
import {DatePicker} from '@mantine/dates'
import type {Schedule} from '@prisma/client'
import {PaymentMethod} from '@prisma/client'
import type {ActionFunction, SerializeFrom} from '@remix-run/node'
import {json, redirect} from '@remix-run/node'
import {useFetcher, useLoaderData} from '@remix-run/react'
import * as React from 'react'
import ReactInputMask from 'react-input-mask'
import {z} from 'zod'
import {PageHeading} from '~/components/ui/PageHeading'
import {db} from '~/db.server'
import {createWalkInOrder} from '~/lib/order.server'
import {useAdminData} from '~/utils/hooks'
import {formatCurrency, formatDate, formatTime, titleCase} from '~/utils/misc'
import {badRequest} from '~/utils/misc.server'
import type {inferErrors} from '~/utils/validation'
import {validateAction} from '~/utils/validation'

export const loader = async () => {
	const customers = await db.audience.findMany()
	return json({
		customers,
	})
}

type DateToString<T> = {
	[K in keyof T]: T[K] extends Date ? string : T[K]
}
type Customer = DateToString<SerializeFrom<typeof loader>['customers'][number]>

const CreateOrderSchema = z.object({
	customerFirstName: z.string().min(1, 'Customer name is required'),
	customerLastName: z.string().min(1, 'Customer name is required'),
	customerEmail: z.string().email('Invalid email address'),
	customerCity: z.string().min(1, 'City is required'),
	customerDob: z
		.string()
		.min(1, 'Date of birth is required')
		.transform(value => new Date(value).toISOString()),
	customerState: z.string().min(1, 'State is required'),
	customerZipCode: z.string().min(1, 'Zip code is required'),
	customerPhone: z.string().min(1, 'Phone number is required'),
	fixtureId: z.string().min(1, 'Fixture is required'),
	noOfTickets: z.preprocess(
		Number,
		z.number().min(1, 'No of tickets is required')
	),
})

interface ActionData {
	success: boolean
	fieldErrors?: inferErrors<typeof CreateOrderSchema>
}

export const action: ActionFunction = async ({request}) => {
	const {fields, fieldErrors} = await validateAction(request, CreateOrderSchema)

	if (fieldErrors) {
		return badRequest<ActionData>({success: false, fieldErrors})
	}

	return createWalkInOrder({
		customerEmail: fields.customerEmail,
		customerFirstName: fields.customerFirstName,
		customerLastName: fields.customerLastName,
		customerCity: fields.customerCity,
		customerState: fields.customerState,
		customerZipCode: fields.customerZipCode,
		customerDob: fields.customerDob,
		customerPhone: fields.customerPhone,
		fixtureId: fields.fixtureId,
		noOfTickets: fields.noOfTickets,
	})
		.then(() => redirect('/admin'))
		.catch(error => {
			console.error(error)
			return badRequest<ActionData>({success: false})
		})
}

export default function WalkIn() {
	const {customers} = useLoaderData<typeof loader>()

	const id = React.useId()
	const fetcher = useFetcher<ActionData>()
	const {fixtures} = useAdminData()

	const [selectedFixtureId, setSelectedFixtureId] = React.useState<
		Schedule['id'] | null
	>(fixtures[0]?.id ?? null)

	const [selectedFixture, setSelectedFixture] =
		React.useState<(typeof fixtures)[number]>()
	const [noOfTickets, setNoOfTickets] = React.useState<number | undefined>(1)

	const isSubmitting = fetcher.state !== 'idle'
	const totalPrice = React.useMemo(() => {
		if (!selectedFixture || !noOfTickets) return 0

		return selectedFixture.pricePerSeat * noOfTickets
	}, [selectedFixture, noOfTickets])

	const upcomingFixtures = React.useMemo(
		() =>
			fixtures.filter(fixture =>
				fixture.timeSlot?.date
					? new Date(fixture.timeSlot.date) > new Date()
					: false
			),
		[fixtures]
	)

	React.useEffect(() => {
		if (!selectedFixtureId) return
		setSelectedFixture(fixtures.find(f => f.id === selectedFixtureId))
	}, [selectedFixtureId, fixtures])

	const [selectedUser, setSelectedUser] = React.useState<Customer | null>(null)

	return (
		<>
			<div className="flex max-w-screen-xl flex-col gap-12 p-10">
				<div className="flex flex-col gap-8">
					<PageHeading title="Walk In" />

					<fetcher.Form method="post" replace>
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
								required
							/>

							<NumberInput
								name="noOfTickets"
								label="No of tickets"
								value={noOfTickets}
								onChange={e => setNoOfTickets(e)}
								error={fetcher.data?.fieldErrors?.noOfTickets}
								min={1}
								required
							/>

							{selectedFixture ? (
								<p className="text-sm">
									Available Seats: {selectedFixture.availableSeats}
								</p>
							) : null}

							<p className="text-sm">
								{totalPrice
									? `Total price: ${formatCurrency(totalPrice)}`
									: null}
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
									defaultValue={'4242 4242 4242 4242'}
									alwaysShowMask={false}
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
						</fieldset>

						<div></div>
						<div className="mt-12 flex w-full items-center justify-end gap-4">
							<Button
								type="submit"
								loading={isSubmitting}
								loaderPosition="right"
							>
								Buy tickets
							</Button>
						</div>
					</fetcher.Form>
				</div>
			</div>
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
