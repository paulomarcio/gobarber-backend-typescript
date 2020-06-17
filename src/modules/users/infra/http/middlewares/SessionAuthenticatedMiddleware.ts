import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import jwtConfig from '@config/jwt';

import AppError from '@shared/errors/AppError';

interface AuthenticatedSessionResponse {
  iat: number;
  exp: number;
  sub: string;
}

const sessionAuthenticatedMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    throw new AppError('Token is missing', 401);
  }

  try {
    const authenticatedSession = verify(token, jwtConfig.secret);

    if (!authenticatedSession) {
      throw new AppError('Invalid provided token', 401);
    }

    const { sub } = authenticatedSession as AuthenticatedSessionResponse;

    request.user = {
      id: sub,
    };
  } catch (err) {
    throw new AppError(err.message, 401);
  }

  return next();
};

export default sessionAuthenticatedMiddleware;
