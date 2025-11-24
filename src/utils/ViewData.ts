import type { Request, Response } from "express";
import { createApi, unwrap } from "./ApiClient.js";
import { token } from "morgan";
import { UserResponse } from "../dto/Response.dto.js";

export const getCommonViewData = async (req: Request) => {
  let categories: any[] = [];
  let user = null;
  let userId = (req as any).userId || null;
  let isLoggedIn = (req as any).isLoggedIn || false;
  let totalCartItems = 0;

  const api = createApi(req);

  // Categories
  try {
    const raw = await api.get('/api/categories');
    categories = Array.isArray(raw.data) ? raw.data : unwrap(raw);
  } catch (e) {
    console.warn('Categories failed:', (e as any)?.message);
  }

  // Profile + cart chỉ khi có token
  const tokenCookie = (req as any)?.cookies?.token;
  if (tokenCookie) {
    // Profile
    try {
      const me = await api.get('/api/users/profile/me');
      user = unwrap<UserResponse>(me);
      userId = user.id;
      isLoggedIn = !!user;
    } catch (e) {
      console.warn('Profile failed:', (e as any)?.message);
    }
    // Cart
    try {
      const cartRes = await api.get('/api/users/cart/me');
      totalCartItems = unwrap(cartRes).totalProduct || 0;
    } catch (e) {
      totalCartItems = 0;
    }
  }
  return { categories, user, userId, isLoggedIn, totalCartItems };
};

export const renderWithCommon = async (
  req: Request,
  res: Response,
  view: string,
  model: Record<string, any> = {}
) => {
  const common = await getCommonViewData(req);
  res.render(view, { ...model, ...common });
};