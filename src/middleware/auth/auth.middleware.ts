import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../service/prisma/prisma.service';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    try {
      if (!token) {
        throw new Error();
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      if (!decoded) {
        throw new Error();
      }

      const findUser = this.prisma.tb_user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!findUser) {
        throw new Error();
      }

      res.status(200).json({ auth: true });
    } catch (error) {
      console.error(error);

      res.status(401).json({ auth: false });
    }
    next();
  }
}
