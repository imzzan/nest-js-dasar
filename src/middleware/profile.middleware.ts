/* eslint-disable prettier/prettier */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction} from 'express';
import { PrismaService } from 'src/prisma.service';

interface Profile  extends Request{
  profile: object
}

@Injectable()
export class ProfileMiddleware implements NestMiddleware {
  constructor( private prisma: PrismaService){}
  async use(req: Profile, res: Response, next: NextFunction) {
    const {id} = req.params;
    const profile = await this.prisma.profile.findUnique({
      where: { id}
    })

    if(!profile) {
      return res.status(404).json({
        status: "FAIL",
        message: "Profile not found"
      })
    }
    req.profile = profile
    next();
  }
}
