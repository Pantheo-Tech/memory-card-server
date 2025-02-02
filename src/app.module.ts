import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiService } from './service/api/api.service';
import { RegisterController } from './controllers/register/register.controller';
import { ControllersService } from './register/controllers/controllers.service';
import { RegisterService } from './controllers/register/register.service';
import { PrismaService } from './service/prisma/prisma.service';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { GameController } from './controllers/game/game.controller';
import { GameService } from './service/game/game.service';

@Module({
  imports: [],
  controllers: [AppController, RegisterController, GameController],
  providers: [
    AppService,
    ApiService,
    ControllersService,
    RegisterService,
    GameService,
    PrismaService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
