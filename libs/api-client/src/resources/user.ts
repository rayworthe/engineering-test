import { HttpClient } from '../http-client';
import { ListEnvelope } from './types';

interface User {
    id: string,
    name: string,
    email: string,
};

interface CreateUserInput {
    name: string,
    email: string,
};

export class Users {
    constructor(private readonly http: HttpClient) {}

    async list(): Promise<User[]> {
        const res = await this.http.request<ListEnvelope<User>>('GET', '/users');
        return res.data;
    }

    async get(id: string): Promise<User> {
        return this.http.request<User>('GET', `/users/${id}`);
    }

    async create(input: CreateUserInput): Promise<User> {
        return this.http.request<User>('POST', '/users', input);
    }

    async delete(id: string): Promise<void> {
        await this.http.request<void>('DELETE', `/users/${id}`);
    }
};
