/* eslint-disable prettier/prettier */
import { Controller, Get, Header, Post, Res, Put, Delete, Body, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { CraeteUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';


@Controller('/user')
export class UserController {
    constructor(private userServices : UserService){}
    @Post('/')
    async create(@Body() payload: CraeteUserDto, @Res() res) {
        const response = await this.userServices.create(payload)
        res.status(201).json({
            status: 'OK',
            message: 'Success create User',
            data: response
        })
    }

    @Get('/')
    @Header('Content-Type', 'application/json')
    async findAllUser(@Res() res) {
        const user = await this.userServices.findAll()
        res.status(200).json({
            status: 'OK',
            message: 'Get All data user available',
            data: user
        })
    }

    @Get(':id')
    @Header('Content-Type','application/json')
    async findById(@Req() req,  @Res() res) {
        const user = req.user
        res.status(200).json({
            status: 'OK',
            message: 'Get detail user success',
            data: user
        })
    }

    @Put(':id')
    @Header('Content-Type', 'application/json')
    async updateUser(@Body() payload: UpdateUserDto, @Req() req,  @Res() res) {
        const {id} = req.user
        await this.userServices.updateUser(Number((id)), payload)
        res.status(200).json({
            status: 'OK',
            message: 'Update user success'
        })
    }

    @Delete(':id')
    @Header('Content-Type', 'application/json')
    async deleteUser(@Req() req,  @Res() res) {
        const {id} = req.user
        const user = await this.userServices.deleteUser(Number(id))
        res.status(200).json({
            status: 'Ok',
            message: 'Delete user success',
            data: user
        })
    }
}
