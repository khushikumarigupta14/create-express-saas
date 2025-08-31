import httpStatus from 'http-status';
import AppError from '../utils/AppError.js';
import { verifyAccessToken } from '../utils/jwt.js';
export function authenticate(req, _res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) throw new AppError('No token provided', httpStatus.UNAUTHORIZED);
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err) {
    next(new AppError(err.message, httpStatus.UNAUTHORIZED));
  }
}
export function authorize(...allowedRoles) {
  return (req, _res, next) => {
    if (!req.user) return next(new AppError('Unauthorized', httpStatus.UNAUTHORIZED));
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError('Forbidden', httpStatus.FORBIDDEN));
    }
    next();
  };
}
