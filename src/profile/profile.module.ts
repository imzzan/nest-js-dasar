/* eslint-disable prettier/prettier */

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaService } from 'src/prisma.service';
import { ProfileMiddleware } from 'src/middleware/profile.middleware';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
})
export class ProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProfileMiddleware)
      .exclude(
        { path: 'profile', method: RequestMethod.GET },
        { path: 'profile', method: RequestMethod.POST }
      )
      .forRoutes(ProfileController);
  }
}