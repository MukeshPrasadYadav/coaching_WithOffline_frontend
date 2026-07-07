// src/api/inceptors.ts
// src/api/interceptors.ts


import { api } from "./Client";
import { useAuthStore } from "../store/auth.store";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error?: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(undefined);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(api(originalRequest)),
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      // Browser automatically sends refresh cookie
      await api.post("/auth/refresh");

      processQueue();

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      useAuthStore.getState().logout();

      // Optional:
      // window.location.href = "/login";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);