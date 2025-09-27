import type { Request, Response } from "express";
import { createApi, unwrap } from "./apiClient.js";

export const getCommonViewData = async (req: Request) => {
  const isLoggedIn = (req as any).isLoggedIn || false;
  const userId = (req as any).userId || null;

  let user = null;
  let categories: any[] = [];

  try {
    const api = createApi(req);

    try {
      const raw = await api.get("/api/categories");
      categories = Array.isArray(raw.data) ? raw.data : unwrap(raw);
    } catch {}

    if (isLoggedIn && userId) {
      try {
        const me = await api.get("/api/users/profile/me");
        user = unwrap(me);
      } catch {}
    }
  } catch {}

  return { isLoggedIn, user, categories, userId };
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