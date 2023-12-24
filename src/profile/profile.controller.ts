/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Res,
  Put,
  HttpCode,
  Delete,
  Req,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create.profile.dto';
import { UpdateProfileDto } from './dto/update.profile.dto';
import { ProfileService } from './profile.service';

@Controller('/profile')
export class ProfileController {
  constructor(private profileServices: ProfileService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  async createProfile(@Body() payload: CreateProfileDto, @Res() res) {
    await this.profileServices.create(payload);
    res.json({
      status: 'OK',
      message: 'Create Profile Success',
      data: payload,
    });
  }

  @Get()
  @Header('Content-Type', 'application/json')
  async getAllProfile(@Res() res) {
    const response = await this.profileServices.getAllProfie();
    res.json({
      status: 'OK',
      message: 'Get All Profile Success',
      data: response,
    });
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async detailUser(@Req() req, @Res() res) {
    try {
      const { id } = req.profile;
      const response = await this.profileServices.detailProfile(id);
      res.json({
        status: 'OK',
        message: 'Get Detail Profile Success',
        data: response,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'FAIL',
        messge: error.message
      })
    }
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async updateProfile(
    @Body() payload: UpdateProfileDto,
    @Req() req,
    @Res() res,
  ) {
    const { id } = req.profile;
    await this.profileServices.updateProfile(id, payload);
    res.json({
      status: 'OK',
      message: 'Update Profile Success',
    });
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  async delete(@Req() req, @Res() res) {
    const { id } = req.profile;
    const response = await this.profileServices.deleteProfile(id);
    res.json({
      status: 'OK',
      message: 'Delete profile success',
      data: response,
    });
  }
}
