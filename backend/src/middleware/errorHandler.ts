import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { env } from '../config/env';

interface AppError extends Error {
  statusCode?: number;
}

export function errorHandler(err: AppError, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation failed',
      details: err.errors,
      statusCode: 400,
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[])?.join(', ') || 'field';
      res.status(409).json({
        error: `A record with this ${target} already exists`,
        statusCode: 409,
      });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({
        error: 'Record not found',
        statusCode: 404,
      });
      return;
    }
  }

  if (err instanceof TokenExpiredError) {
    res.status(401).json({
      error: 'Token expired',
      statusCode: 401,
    });
    return;
  }

  if (err instanceof JsonWebTokenError) {
    res.status(401).json({
      error: 'Invalid token',
      statusCode: 401,
    });
    return;
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Internal server error' : err.message;

  if (statusCode === 500) {
    console.error('[500]', err.message, err.stack);
  }

  res.status(statusCode).json({
    error: message,
    ...(env.NODE_ENV === 'development' && { details: err.stack }),
    statusCode,
  });
}
