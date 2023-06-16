import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class EnsureAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    const { headers } = req;

    const { authorization } = headers;

    if (!authorization) {
      throw new UnauthorizedException('Token is missing');
    }

    if (authorization !== '123123') {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
