/* eslint-disable prettier/prettier */
import { IsEmail, MaxLength, MinLength } from "class-validator";

/* eslint-disable prettier/prettier */
export class ChangeEmailDto {

    @IsEmail({},{message:'รูปแบบอีเมล์ไม่ถูกต้อง'})
    oldEmail: string;

    @IsEmail({},{message:'รูปแบบอีเมล์ไม่ถูกต้อง'})
    newEmail: string;
}