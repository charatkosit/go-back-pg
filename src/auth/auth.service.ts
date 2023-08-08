/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2'
import { environment } from 'src/environments/environment';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/registerDto';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { ChangeEmailDto } from './dto/ChangeEmailDto';
import { ChangePwdDto } from './dto/ChangePwdDto';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        private jwtService: JwtService
    ) { }


    async findAllUsers() {
        return await this.usersRepository.find({
            select: ['UserId', 'FullName', 'CodeUserId', 'email', 'Permission', 'status', 'Saleman']
        })
    }

    async fullname(id: number) {
        const sql = `select Fullname from users where UserId =${id} `

        return await this.usersRepository.query(sql);
    }

    async findSaleMemberList(saleman: string) {
        console.log(`Saleman: ${saleman}`)
        return await this.usersRepository.find({
            select: ['UserId', 'FullName', 'CodeUserId', 'email', 'Permission', 'status', 'Saleman'],
            where: { Saleman: saleman }
        })
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

    decoder(token: string) {
        return this.jwtService.decode(token)
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



