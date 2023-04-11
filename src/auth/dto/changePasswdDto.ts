/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

/* eslint-disable prettier/prettier */
export class ChangePasswdDto {
    Token: string;


    @IsNotEmpty({message:'อีเมล์ห้ามว่าง'})
    @IsEmail({},{message:'รูปแบบอีเมล์ไม่ถูกต้อง'})
    Email: string;
    
    @IsNotEmpty({message:'รหัสผ่านห้ามว่าง'})
    @MinLength(5, {each:true, message:'รหัสผ่านต้องมากกว่า $constraint1 ตัวอักษรขึ้นไป'})
    Password: string;

    @IsNotEmpty({message:'รหัสผ่านห้ามว่าง'})
    @MinLength(5, {each:true, message:'รหัสผ่านต้องมากกว่า $constraint1 ตัวอักษรขึ้นไป'})

    NewPassword: string;


    

}