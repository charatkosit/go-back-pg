/* eslint-disable prettier/prettier */
import {IsNotEmpty, MinLength, IsEmail} from 'class-validator'

export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(5)
    FullName: string;

    CodeUserId: string;

    @IsNotEmpty({message:'อีเมล์ห้ามว่าง'})
    @IsEmail({},{message:'รูปแบบอีเมล์ไม่ถูกต้อง'})
    email: string;
    
    @IsNotEmpty({message:'รหัสผ่านห้ามว่าง'})
    @MinLength(5, {each:true, message:'รหัสผ่านต้องมากกว่า $constraint1 ตัวอักษรขึ้นไป'})
    Password: string;

    Permission: string;
}
