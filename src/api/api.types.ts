// src/api/api.types.ts

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error: ErrorResponse | null;
  timeStamp: string;
}

export interface ErrorResponse {
  status: number;
  message: string;
  details?: Record<string, string>;
}