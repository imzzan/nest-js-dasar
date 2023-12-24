/* eslint-disable prettier/prettier */

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { UserMiddleware } from 'src/middleware/user.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude(
        { path: 'user', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.POST }
      )
      .forRoutes(UserController);
  }
}
