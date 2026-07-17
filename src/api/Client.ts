// src/api/Client.ts
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_BASE_URL;

export interface PageResponse<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    page: number;
    pageSize: number;
}

export function toPageResponse<T>(page: any): PageResponse<T> {
    return {
        items: page.content,
        totalItems: page.totalElements,
        totalPages: page.totalPages,
        page: page.number,
        pageSize: page.size,
    };
}

export const api = axios.create({
  baseURL: BaseURL,
  timeout: 10_000,
  withCredentials: true, 
});