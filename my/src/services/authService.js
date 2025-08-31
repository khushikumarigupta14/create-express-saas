import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import { userRepository } from '../repository/userRepository.js';
import AppError from '../utils/AppError.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { env } from '../config/env.js';
import { ERROR_MESSAGES } from '../constants/index.js';
export const authService = {
  async register({ name, email, password, role }) {
    const existing = await User.findOne({ email });
    if (existing) throw new AppError(ERROR_MESSAGES.EMAIL_IN_USE, httpStatus.CONFLICT);
    const user = await userRepository.create({ name, email, password, role });
    const accessToken = signAccessToken({ id: user._id, role: user.role });
    const refreshToken = signRefreshToken({ id: user._id, role: user.role });
    const decoded = jwt.decode(refreshToken);
    await RefreshToken.create({ user: user._id, token: refreshToken, expiresAt: new Date(decoded.exp * 1000) });
    return { user, accessToken, refreshToken };
  },
  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new AppError(ERROR_MESSAGES.INVALID_CREDENTIALS, httpStatus.UNAUTHORIZED);
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new AppError(ERROR_MESSAGES.INVALID_CREDENTIALS, httpStatus.UNAUTHORIZED);
    const accessToken = signAccessToken({ id: user._id, role: user.role });
    const refreshToken = signRefreshToken({ id: user._id, role: user.role });
    const decoded = jwt.decode(refreshToken);
    await RefreshToken.create({ user: user._id, token: refreshToken, expiresAt: new Date(decoded.exp * 1000) });
    return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken };
  },
  async refresh(refreshToken) {
    if (!refreshToken) throw new AppError('Refresh token required', httpStatus.BAD_REQUEST);
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new AppError(ERROR_MESSAGES.TOKEN_INVALID, httpStatus.UNAUTHORIZED);
    }
    const stored = await RefreshToken.findOne({ token: refreshToken });
    if (!stored) throw new AppError(ERROR_MESSAGES.TOKEN_INVALID, httpStatus.UNAUTHORIZED);
    const accessToken = signAccessToken({ id: payload.id, role: payload.role });
    return { accessToken };
  },
  async logout(refreshToken) {
    if (refreshToken) {
      await RefreshToken.deleteOne({ token: refreshToken });
    }
    return { success: true };
  }
};
