import httpStatus from 'http-status';
import logger from '../utils/logger.js';
export function errorHandler(err, _req, res, _next) {
  const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const payload = {
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack, details: err.details })
  };
  if (status >= 500) {
    logger.error(err);
  }
  res.status(status).json(payload);
}
