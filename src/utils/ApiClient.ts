import axios, { AxiosInstance } from "axios";
import type { Request } from "express";

export const apiUrl = "http://localhost:8000";

export const unwrap = <T = any>(res: any): T => (res?.data?.data ?? res?.data ?? res) as T;

export function createApi(req?: Request): AxiosInstance {
  const instance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
  });

  const token = (req as any)?.cookies?.token;
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return instance;
}