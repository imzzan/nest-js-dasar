/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { CraeteUserDto } from './dto/create.user.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CraeteUserDto) {
    const user = await this.prisma.user.create({
      data: { ...payload }
    });
    return user;
  }

  async findAll(): Promise<CraeteUserDto[] | null> {
    const user = await this.prisma.user.findMany()
    return user
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {id}
    })
    return user
  }

  async updateUser(id: number, payload: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {id},
      data: {...payload, active: true}
    })

    return user
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.delete({
      where: {id}
    })

    return user
  }
}
