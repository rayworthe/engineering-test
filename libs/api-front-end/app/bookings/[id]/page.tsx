import { Card, Group, Stack, Text, Title } from '@mantine/core';
import { NotFoundError } from 'eurocamp-api-client/dist/errors/NotFoundError';
import { notFound } from 'next/navigation';
import { euroClientApi } from '../../../libs/euro-client-api';
import SitePage from '../../components/site-page';

const BookingDetailPage = async ({ params }: PageProps<'/bookings/[id]'>) => {
    const { id } = await params;

    // for testing error
    if (id === 'boom') throw new Error('Simulated failure');

    let booking;
    try {
        booking = await euroClientApi.bookings.get(id);
    } catch (error) {
        if (error instanceof NotFoundError) {
            notFound();
        }
        throw error;
    }

    return (
        <SitePage withBreadcrumbs overflow={false}>
            <Stack gap='md' pt='md'>
                <Title order={3}>Booking - {booking.id}</Title>
                <Card withBorder padding='lg' radius='md'>
                    <Stack gap='sm'>
                        <Group justify='space-between'>
                            <Text fw={600}>User</Text>
                            <Text>{booking.user}</Text>
                        </Group>
                        <Group justify='space-between'>
                            <Text fw={600}>Parc</Text>
                            <Text>{booking.parc}</Text>
                        </Group>
                        <Group justify='space-between'>
                            <Text fw={600}>Booking date</Text>
                            <Text>{new Date(booking.bookingdate).toLocaleDateString()}</Text>
                        </Group>
                        <Group justify='space-between' align='flex-start'>
                            <Text fw={600}>Comments</Text>
                            <Text style={{ maxWidth: '60%', textAlign: 'right' }}>
                                {booking.comments ?? '—'}
                            </Text>
                        </Group>
                    </Stack>
                </Card>
            </Stack>
        </SitePage>
    );
};

export default BookingDetailPage;
