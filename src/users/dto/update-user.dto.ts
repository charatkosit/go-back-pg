/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
   
    @MinLength(5)
    FullName: string;

    CodeUserId: string;

  
    @IsEmail({},{message:'รูปแบบอีเมล์ไม่ถูกต้อง'})
    email: string;
    

    Permission: string;
}
