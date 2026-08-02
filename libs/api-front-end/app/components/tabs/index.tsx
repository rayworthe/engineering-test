'use client';

import { Avatar, Box, Button, Container, Group, Menu, Tabs, Title } from '@mantine/core';
import { usePathname } from 'next/navigation';
import classes from './index.module.css';
import Link from 'next/link';
import { ChevronDown, Settings, User, LogOut } from 'lucide-react';

const tabs = [
    { path: '/', label: 'Home' },
    { path: '/parcs', label: 'Parcs' },
    { path: '/bookings', label: 'Bookings' },
    { path: '/users', label: 'Users' },
];

const Toolbar = () => {
    const pathname = usePathname();

    return (
        <Box className={classes.header}>
            <Container py='md'>
                <Group w='100%' justify='space-between' align='center'>
                    <Title order={2}>Eurocamp Admin Portal</Title>
                    <Menu>
                        <Menu.Target>
                            <Button
                                color='gray'
                                rightSection={<ChevronDown size={20}/>}
                                leftSection={
                                    <Avatar
                                        size='sm'
                                        radius='xl'
                                        src='https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                                    />
                                }
                                variant='subtle'
                            >
                                Conky Conkers
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>
                                <Group w='100%' justify='space-between'>
                                    <User size={16}/>
                                    Profile
                                </Group>
                            </Menu.Item>
                            <Menu.Item>
                                <Group w='100%' justify='space-between'>
                                    <Settings size={16}/>
                                    Settings
                                </Group>
                            </Menu.Item>
                            <Menu.Item bg='red.0' color='red'>
                                <Group w='100%' justify='space-between'>
                                    <LogOut size={16}/>
                                    Logout
                                </Group>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Container>
            <Tabs
                classNames={{
                    root: classes.tabs,
                    list: classes.tabsList,
                    tab: classes.tab,
                }}
                value={pathname}
                variant='outline'
            >
                <Box bg='gray.0'>
                    <Container>
                        <Tabs.List>
                            {tabs.map((tab) => (
                                <Tabs.Tab
                                    key={tab.path}
                                    value={tab.path}
                                    renderRoot={(props) => <Link href={tab.path} {...props}/>}
                                >
                                    {tab.label}
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>
                    </Container>
                </Box>
            </Tabs>
        </Box>
    );
};

export default Toolbar;
