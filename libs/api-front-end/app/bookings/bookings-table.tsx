'use client';

import { ActionIcon, Anchor, Group, Table } from '@mantine/core';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { Booking } from 'eurocamp-api-client/dist/resources/bookings';
import { ArrowUpAZ, ArrowUpZA } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
    bookings: Booking[],
};

const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: 'id',
        header: 'Booking ID',
        cell: ({ getValue }) => {
            const id = getValue() as string;
            return (
                <Anchor component={Link} href={`/bookings/${id}`}>
                    {id}
                </Anchor>
            );
        },
    },
    { accessorKey: 'user', header: 'User' },
    { accessorKey: 'parc', header: 'Parc' },
    { accessorKey: 'bookingdate', header: 'Date', cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString() },
    { accessorKey: 'comments', header: 'Comments', cell: ({ getValue }) => getValue() ?? '—' },
];

const getSortingIcon = (sorting: SortingState, columnId: string, onClick?: (event: unknown) => void) => {
    const sortState = sorting.find((s) => s.id === columnId);

    const icon = sortState?.desc ? <ArrowUpZA size={16}/> : <ArrowUpAZ size={16}/>;

    if (!sortState) {
        return (
            <ActionIcon onClick={onClick} color='gray' variant='light' size='sm'>
                <ArrowUpAZ size={16} opacity={0.3}/>
            </ActionIcon>
        );
    }

    return (
        <ActionIcon onClick={onClick} color='gray' variant='light' size='sm'>
            {icon}
        </ActionIcon>
    );
};

const BookingsTable = ({ bookings }: Props) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data: bookings,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <Table striped highlightOnHover>
            <Table.Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Table.Tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <Table.Th key={header.id}>
                                <Group w='100%' justify='space-between' wrap='nowrap'>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {getSortingIcon(sorting, header.column.id, header.column.getToggleSortingHandler())}
                                </Group>
                            </Table.Th>
                        ))}
                    </Table.Tr>
                ))}
            </Table.Thead>
            <Table.Tbody>
                {table.getRowModel().rows.map((row) => (
                    <Table.Tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <Table.Td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Table.Td>
                        ))}
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );
};

export default BookingsTable;
