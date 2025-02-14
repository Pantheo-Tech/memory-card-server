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
import { HttpModule } from '@nestjs/axios';
import { SchedulerService } from './service/scheduler/scheduler/scheduler.service';
import { SyncController } from './controllers/sync/sync.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { RawgController } from './controllers/rawg/rawg.controller';
import { RawgService } from './controllers/rawg/rawg.service';
import { PasswordController } from './controllers/password/password.controller';
import { PasswordService } from './controllers/password/password.service';
import { PasswordModule } from './controllers/password/password.module';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule, PasswordModule],

  controllers: [
    AppController,
    PasswordController,
    RegisterController,
    LoginController,
    GameController,
    SyncController,
    SyncController,
    RawgController,
  ],
  providers: [
    AppService,
    ApiService,
    LoginService,
    RegisterService,
    GameService,
    PrismaService,
    PasswordService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    SchedulerService,
    RawgService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
