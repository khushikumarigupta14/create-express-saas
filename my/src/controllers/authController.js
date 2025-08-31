import { created, ok } from '../utils/response.js';
import { authService } from '../services/authService.js';
export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    return created(res, result, 'User registered');
  } catch (err) { next(err); }
};
export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    return ok(res, result, 'Logged in');
  } catch (err) { next(err); }
};
export const refresh = async (req, res, next) => {
  try {
    const result = await authService.refresh(req.body.refreshToken);
    return ok(res, result, 'Token refreshed');
  } catch (err) { next(err); }
};
export const logout = async (req, res, next) => {
  try {
    const result = await authService.logout(req.body.refreshToken);
    return ok(res, result, 'Logged out');
  } catch (err) { next(err); }
};
