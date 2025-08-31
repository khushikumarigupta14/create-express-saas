import { ok } from '../utils/response.js';
import { userService } from '../services/userService.js';
export const getUsers = async (_req, res, next) => {
  try {
    const users = await userService.list();
    return ok(res, users);
  } catch (err) { next(err); }
};
export const getMe = async (req, res, next) => {
  try {
    const me = await userService.get(req.user.id);
    return ok(res, me);
  } catch (err) { next(err); }
};
