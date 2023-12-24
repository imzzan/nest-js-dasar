/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CraeteUserDto } from './create.user.dto';

export class UpdateUserDto extends PartialType(CraeteUserDto) {}
