import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiService } from './service/api/api.service';
import { RegisterController } from './controllers/register/register.controller';
import { RegisterService } from './controllers/register/register.service';
import { PrismaService } from './service/prisma/prisma.service';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { GameService } from './service/game/game.service';
import { LoginController } from './controllers/login/login.controller';
import { LoginService } from './controllers/login/login.service';
import { GameController } from './controllers/game/game.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth/auth.guard';

@Module({
  imports: [],

  controllers: [
    AppController,
    RegisterController,
    LoginController,
    GameController,
  ],
  providers: [
    AppService,
    ApiService,
    LoginService,
    RegisterService,
    GameService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
