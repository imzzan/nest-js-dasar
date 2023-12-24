/* eslint-disable prettier/prettier */

import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfileDto } from './dto/create.profile.dto';
import { UpdateProfileDto } from './dto/update.profile.dto';

@Injectable()
export class ProfileService {
    constructor( private prisma: PrismaService ) {}

    async create(payload: CreateProfileDto) {
        const email = payload.email

        const currentUser = await this.prisma.profile.findUnique({
            where: { email }
        })

        if(currentUser) {
            throw new ConflictException('Email already exists')
        }

        const profile = await this.prisma.profile.create({
            data: {...payload}
        })

        return profile
    }

    async getAllProfie() {
        const profile = await this.prisma.profile.findMany()
        return profile
    }

    async detailProfile(id: string) {
        const profile = await this.prisma.profile.findUnique({
            where: { id },
        })
        return profile
    }

    async updateProfile(id: string, payload: UpdateProfileDto) {
        const profile = await this.prisma.profile.update({
            where: { id },
            data: {...payload}
        })
        return profile
    }

    async deleteProfile(id: string) {
        const profile = await this.prisma.profile.delete({
            where: { id }
        })
        return profile
    }
}
