import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { NextFunction } from 'express';

@Injectable()
export class RefreshMiddleware implements NestMiddleware {
  constructor (
    private authService: AuthService,
  ) {}

  async use (request: Request, response: Response, next: NextFunction) {
    await this.authService.deleteOldSessions();
    return next();
  }
}
