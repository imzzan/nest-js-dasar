/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Request, Response, NextFunction } from 'express';

interface CurrentUser extends Request{
  user: object
}


@Injectable()
export class UserMiddleware implements NestMiddleware {

  constructor( private prisma: PrismaService){}

  async use(req: CurrentUser, res: Response, next: NextFunction) {
    const {id} = req.params
    
    const curenntUser = await this.prisma.user.findUnique({
      where : {id: Number(id)}
    })
    if(!curenntUser) {
      return res.status(404).json({
        status: "FAIL",
        message: "User not found"
      })
    }
    req.user = curenntUser
    next();
  }
}
