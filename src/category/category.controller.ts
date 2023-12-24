/* eslint-disable prettier/prettier */

import { Controller, Get, Res } from '@nestjs/common';

@Controller('/category')
export class CategoryController {

    @Get()
    findAll(@Res() res) {
        res.json({
            status: 'OK',
            message: 'Get All Categories jadi',
            data: [
                {
                    name: 'Muhamad Muzani',
                    kelas: 'TI KIP 2021 P4',
                    nim: '41215416'
                },
                {
                    name: 'Cogil',
                    kelas: 'TI KIP 2021 P3',
                    nim: '41215416'
                },
                {
                    name: 'Cegil',
                    kelas: 'TI KIP 2021 P2',
                    nim: '41215416'
                }
            ]
        })
    }
}
