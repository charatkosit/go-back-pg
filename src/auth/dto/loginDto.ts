/* eslint-disable prettier/prettier */
import { IsEmail, MaxLength, MinLength } from "class-validator";

/* eslint-disable prettier/prettier */
export class LoginDto {


    @IsEmail({},{message:'รูปแบบอีเมล์ไม่ถูกต้อง'})
    email: string;

    @MinLength(4, {each:true, message:'รหัสผ่านสั้นเกินไป'})
    @MaxLength(20, {each:true, message:'รหัสผ่านยาวเกินไป'})
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {message: 'password too weak'})
    password: string;
}