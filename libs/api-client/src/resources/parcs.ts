import { HttpClient } from '../http-client';
import { ListEnvelope } from './types';

interface Parc {
    id: string,
    name: string,
    description: string,
};

interface CreateParcInput {
    name: string,
    description: string,
};

export class Parcs {
    constructor(private readonly http: HttpClient) {}

    async list(): Promise<Parc[]> {
        const res = await this.http.request<ListEnvelope<Parc>>('GET', '/parcs');
        return res.data;
    }

    async get(id: string): Promise<Parc> {
        return this.http.request<Parc>('GET', `/parcs/${id}`);
    }

    async create(input: CreateParcInput): Promise<Parc> {
        return this.http.request<Parc>('POST', '/parcs', input);
    }

    async delete(id: string): Promise<void> {
        await this.http.request<void>('DELETE', `/parcs/${id}`);
    }
};
