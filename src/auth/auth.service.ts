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
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        private jwtService: JwtService
    ) { }




    async changePasswd(email: string, password: string, newPassword: string) {
        // ตรวจสอบ  email นี้ว่ามีจริงหรือเปล่่า
        const user = await this.usersRepository.findOne({
            select: ['UserId', 'FullName', 'Password', 'Permission'],
            where: { email: email }
        })
        if (!user) {
            throw new NotFoundException('ไม่พบผู้ใช้ในระบบ')
        }

        // ตรวจสอบว่า password เก่าว่าถูกต้องหรือไม่
        const isValid = await argon2.verify(user.Password, password)
        if (!isValid) {
            throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง')
        }

        // นำรหัสใส่ เข้ารหัส และ save

    }





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
        return await this.usersRepository.find({ select: ['UserId', 'FullName', 'CodeUserId', 'email', 'Permission', 'status'] })
    }




    async register(registerDto: RegisterDto): Promise<Users> {
        //1. นำ email ไปตรวจสอบ ว่าซ้ำหรือไม่
        //2. ถ้าไม่ซ้ำ ให้สร้าง 
        //3. permission default ให้เป็น member
        //4. password ให้เข้ารหัส
        console.log(`email is ${registerDto.Email}`)
        const userExists = await this.usersRepository.findOne({
            select: ['UserId'],
            where: { email: registerDto.Email }
        })

        if (userExists) {
            console.log(userExists)
            console.log(registerDto.Email)
            throw new ConflictException('มี email นี้แล้วในระบบ')

        }

        const user = new Users();
        user.FullName = registerDto.FullName;
        user.CodeUserId = registerDto.CodeUserId;
        user.email = registerDto.Email;
        user.Password = await argon2.hash(registerDto.Password);
        user.Permission = registerDto.Permission;
        user.status = registerDto.status;

        return await this.usersRepository.save(user)
    }

    //------------------------------------------------
    //     function สำหรับทำ  2FA                     |
    //                                               |
    //------------------------------------------------

    // ฟังก์ชันตรวจสอบ OTP
    async verifyOtp(token: string, user: any): Promise<boolean> {
        // นำ OTP secret ของผู้ใช้มาจากฐานข้อมูลหรือแหล่งข้อมูลอื่น ๆ
        const otpSecret = user.otpSecret;
        // ตรวจสอบ OTP
        const isValid = speakeasy.totp.verify({
            secret: otpSecret,
            encoding: 'base32',
            token: token,
            window: 1, // กำหนดหน้าต่างของOTP ที่ยอมรับ (ในกรณีนี้คือ 1 นาที)
        });
        return isValid;
    }



    generateQRCode(secret: string, username: string): Promise<string> {
        return new Promise((resolve, reject) => {
          const otpAuthUrl = speakeasy.otpauthURL({
            secret,
            label: username,
            issuer: 'YourApp',
            encoding: 'base32',
          });
          qrcode.toDataURL(otpAuthUrl, (err, dataUrl) => {
            if (err) {
              reject(err);
            } else {
              resolve(dataUrl);
            }
          });
        });
      }

      
}



