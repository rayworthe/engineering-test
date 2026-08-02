'use client';

import { Alert, Button, Group, Stack, Text } from '@mantine/core';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import SitePage from '../../components/site-page';

interface Props {
    error: Error & { digest?: string },
    reset: () => void,
};

const BookingDetailError = ({ error, reset }: Props) => {
    useEffect(() => {
        // could log to an error reporting service here
        console.error('Booking detail error:', error);
    }, [error]);

    return (
        <SitePage containerProps={{ p: 'md' }} overflow={false}>
            <Stack gap='md'>
                <Alert
                    variant='light'
                    color='red'
                    title='Something went wrong'
                    icon={<AlertTriangle size={18}/>}
                >
                    {`We couldn't load this booking. The API may be temporarily unavailable.`}
                    {error.digest && (
                        <Text c='dimmed' fz='sm' mt='xs'>
                            Reference: {error.digest}
                        </Text>
                    )}
                </Alert>
                <Group>
                    <Button onClick={reset}>Try again</Button>
                    <Button component={Link} href='/bookings' variant='default'>
                        Back to bookings
                    </Button>
                </Group>
            </Stack>
        </SitePage>
    );
};

export default BookingDetailError;
