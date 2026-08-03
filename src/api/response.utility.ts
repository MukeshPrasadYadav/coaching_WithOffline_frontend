// src/api/response.utility.ts

import axios from "axios";
import type { ApiResponse } from "./api.types";
import { api } from "./Client";

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export async function get<T>(url : string): Promise<T>{
    const response = await api.get<ApiResponse<T>>(url);

    return response.data.data;
}

export async function getPage<T,p extends object>(
  url: string,
  params?: p
): Promise<PageResponse<T>> {
  const response = await api.get<ApiResponse<PageResponse<T>>>(url, {
    params,
  });

  console.log(response.data);
  console.log(response.data.data)

  return response.data.data;
}



export interface MutationResponse<T> {
  message: string;
  data: T;
}

export async function post<TRequest,TResponse>(
  url: string,
  body?: TRequest
): Promise<MutationResponse<TResponse>> {
  const response = await api.post<ApiResponse<TResponse>>(url, body);

  return {
    message: response.data.message,
    data: response.data.data,
  };
}

export async function put<TResponse, TRequest>(
  url: string,
  body: TRequest
): Promise<MutationResponse<TResponse>> {
  const response = await api.put<ApiResponse<TResponse>>(url, body);

  return {
    message: response.data.message,
    data: response.data.data,
  };
}