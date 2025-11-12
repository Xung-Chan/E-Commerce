import type { Request, Response } from "express";
import { createApi, unwrap } from "./ApiClient.js";

export const getCommonViewData = async (req: Request) => {
  let user = null;
  let userId = (req as any).userId || null;
  let isLoggedIn = (req as any).isLoggedIn || false;

  let categories: any[] = [];

  try {
    const api = createApi(req);

    const raw = await api.get("/api/categories");
    categories = Array.isArray(raw.data) ? raw.data : unwrap(raw);

    // If middleware didn't set isLoggedIn but we still have a token cookie,
    // attempt to fetch profile and infer login state.
    const hasToken = !!(req as any)?.cookies?.token;
    if ((isLoggedIn && userId) || hasToken) {
      try {
        const me = await api.get("/api/users/profile/me");
        user = unwrap(me);
        if (user && !userId) userId = user._id || user.id || null;
        isLoggedIn = !!user;
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
  console.log('Rendering view', view, 'with model', model, 'and common data', common);
  res.render(view, { ...model, ...common });
};