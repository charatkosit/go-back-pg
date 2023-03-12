/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2'
import { environment } from 'src/environments/environment';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/registerDto';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        private jwtService: JwtService
    ) { }

    async login(email: string, password: string) {
        // const user = { email: 'charatkosit@gmail.com', password: '1234'}
        const user = await this.usersRepository.findOne({
            select: ['UserId', 'FullName', 'Password', 'Permission'],
            where: { email: email }
        })

        if (!user) {
            throw new NotFoundException('ไม่พบผู้ใช้ในระบบ')
        }
        // console.log(user.Password)
        // //compare password
        const isValid = await argon2.verify(user.Password, password)
        if (!isValid) {
            throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง')
        }

        //  สร้าง token
        const token = await this.jwtService.signAsync({
            userId: user.UserId,
            permission: user.Permission,
        }, {
            secret: environment.jwt_secrect
        })

        return { access_token: token }
    }

    async findAllUsers() {
        return await this.usersRepository.find()
    }

   async register(registerDto:RegisterDto) {
    //1. นำ email ไปตรวจสอบ ว่าซ้ำหรือไม่
    //2. ถ้าไม่ซ้ำ ให้สร้าง 
    //3. permission default ให้เป็น member
    //4. password ให้เข้ารหัส
    const userExists = await this.usersRepository.findOne({
        select: ['UserId'],
        where: { email: registerDto.Email}
    })
  
    if (userExists) {
        throw new ConflictException('มี email นี้แล้วในระบบ')
    }





        return registerDto;
    }
}
