import { Box, Container, ScrollArea } from '@mantine/core';

interface Props {
    children: React.ReactNode,
    overflow?: boolean,
    withBreadcrumbs?: boolean,
    containerProps?: React.ComponentProps<typeof Container>,
    boxProps?: React.ComponentProps<typeof Box>,
    scrollAreaProps?: React.ComponentProps<typeof ScrollArea>,
};

const SitePage = ({ children, overflow = true, containerProps, boxProps, scrollAreaProps }: Props) => {
    if (!overflow) {
        return (
            <Container {...containerProps}>
                <Box className='flex flex-col flex-1 min-h-0' {...boxProps}>
                    {children}
                </Box>
            </Container>
        )
    };

    return (
        <ScrollArea h='100%' {...scrollAreaProps}>
            <Container {...containerProps}>
                {children}
            </Container>
        </ScrollArea>
    )
};

export default SitePage;
