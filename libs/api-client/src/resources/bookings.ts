import { HttpClient } from '../http-client';
import { ListEnvelope } from './types';

export interface Booking {
    id: string,
    user: string,
    parc: string,
    bookingdate: string,
    comments?: string,
};

export interface CreateBookingInput {
    user: string,
    parc: string,
    bookingdate: string,
    comments?: string,
};

export class Bookings {
    constructor(private readonly http: HttpClient) {}

    async list(): Promise<Booking[]> {
        const res = await this.http.request<ListEnvelope<Booking>>('GET', '/bookings');
        return res.data;
    }

    async get(id: string): Promise<Booking> {
        return this.http.request<Booking>('GET', `/bookings/${id}`);
    }

    async create(input: CreateBookingInput): Promise<Booking> {
        return this.http.request<Booking>('POST', '/bookings', input);
    }

    async delete(id: string): Promise<void> {
        await this.http.request<void>('DELETE', `/bookings/${id}`);
    }
};
