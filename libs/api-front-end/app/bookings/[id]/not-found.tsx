'use client';

import { Button, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import SitePage from '../../components/site-page';

const BookingNotFound = () => {
    return (
        <SitePage overflow={false}>
            <Stack gap='md' mt='md' align='flex-start'>
                <Title order={2}>Booking not found</Title>
                <Text c='dimmed'>
                    {`We couldn't find a booking with that ID. It may have been deleted.`}
                </Text>
                <Button component={Link} href='/bookings' variant='default'>
                    Back to bookings
                </Button>
            </Stack>
        </SitePage>
    );
};

export default BookingNotFound;
