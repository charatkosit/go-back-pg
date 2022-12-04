/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2'


@Injectable()
export class AuthService {
    constructor(){}
    login(email: string, password: string) {
        const user = { email: 'charatkosit@gmail.com', password: '1234'}
        if (!user) {
            throw new NotFoundException('ไม่พบผู้ใช้ในระบบ')
        }

        //compare password
        const isValid = argon2.verify(user.password, password)
        if (!isValid) {
            throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง')
        }
        return user
    }
}
