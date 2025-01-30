import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    console.log('URL:', url);
    console.log('Método:', req.method);
    next();
  }
}
