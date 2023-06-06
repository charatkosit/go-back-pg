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


    async approve(email: string) {
        // const user = { email: 'charatkosit@gmail.com', password: '1234'}
        const user = await this.usersRepository.findOne({
            select: ['UserId', 'FullName', 'Password', 'Permission', 'status'],
            where: { email: email }
        })

        if (!user) {
            throw new NotFoundException('ไม่พบผู้ใช้ในระบบ')
        }
        if (user.status === 'approved') {
            throw new BadRequestException('ผู้ใช้รายนี้ได้รับการอนุมัติอยู่แล้ว')
        }

        await this.usersRepository.update(user.UserId, { status: 'approved' })
        return {
            "statusCode": 200,
            "message": "Update status approved OK",
        }
    }

    async forgotPassword(email: string) {
        // ตรวจสอบ  email นี้ว่ามีจริงหรือเปล่า
        const user = await this.usersRepository.findOne({
            select: ['UserId', 'FullName', 'Password', 'Permission'],
            where: { email: email }
        })
        if (!user) {
            throw new NotFoundException('ไม่พบผู้ใช้ในระบบ')
        }

        //ส่ง email ไปหา  ต้องยืนยันภายใน 10 นาที 
        // gen รหัสที่มีอายุได้ 10 นาที  ไปกับ email 
        return {
            "statusCode": 200,
            "message": "Send Email OK",
        }
    }

    async confirmEmailForgotPassword(email:string , secret:string){
        // ตรวจสอบ  email นี้ว่ามีจริงหรือเปล่า
        const user = await this.usersRepository.findOne({
            select: ['UserId', 'FullName', 'Password', 'Permission'],
            where: { email: email }
        })
        if (!user) {
            throw new NotFoundException('ไม่พบผู้ใช้ในระบบ')
        }

        //ตรวจสอบ  secret ถูกต้องหรือไม่ แต่ยังไม่หมดอายุ
        
    }



    async adminChangePassword(email: string, newPassword: string) {
        // ตรวจสอบ  email นี้ว่ามีจริงหรือเปล่า
        const user = await this.usersRepository.findOne({
            select: ['UserId', 'FullName', 'Password', 'Permission'],
            where: { email: email }
        })
        if (!user) {
            throw new NotFoundException('ไม่พบผู้ใช้ในระบบ')
        }

        // นำรหัสใส่ เข้ารหัส และ save
        const newPassHash = await argon2.hash(newPassword);
        console.log(`change Pass:${email}, ${newPassword}, ${newPassHash}`)
        await this.usersRepository.update(user.UserId, { Password: newPassHash });
        return { message: "OK" }
    }

    async adminChangeSuPassword(email: string, newSuPassword: string) {
        // ตรวจสอบ  email นี้ว่ามีจริงหรือเปล่า
        const user = await this.usersRepository.findOne({
            select: ['UserId', 'FullName', 'SuPassword', 'Permission'],
            where: { email: email }
        })
        if (!user) {
            throw new NotFoundException('ไม่พบผู้ใช้ในระบบ')
        }

        // นำรหัสใส่ เข้ารหัส และ save
        const newSuPassHash = await argon2.hash(newSuPassword);
        console.log(`change Pass:${email}, ${newSuPassword}, ${newSuPassHash}`)
        await this.usersRepository.update(user.UserId, { SuPassword: newSuPassHash });
        return { message: "OK" }
    }


    async userChangePassword(email: string, oldPassword: string, newPassword: string) {
        // ตรวจสอบ  email นี้ว่ามีจริงหรือเปล่่า
        const user = await this.usersRepository.findOne({
            select: ['UserId', 'FullName', 'Password', 'Permission'],
            where: { email: email }
        })
        if (!user) {
            throw new NotFoundException('ไม่พบผู้ใช้ในระบบ')
        }

        // ตรวจสอบว่า password เก่าว่าถูกต้องหรือไม่
        const isValid = await argon2.verify(user.Password, oldPassword)
        if (!isValid) {
            throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง')
        }

        // นำรหัสใส่ เข้ารหัส และ save
        const newPassHash = await argon2.hash(newPassword);
        console.log(`change Pass:${email}, ${oldPassword}, ${newPassword}, ${newPassHash}`)
        await this.usersRepository.update(user.UserId, { Password: newPassHash });
        return { message: "OK" }
    }





    async login(email: string, password: string) {
        const user = await this.usersRepository.findOne({
            select: ['UserId', 'FullName', 'Password', 'Permission', 'status'],
            where: { email: email }
        })

        if (!user) {
            throw new NotFoundException('ไม่พบผู้ใช้ในระบบ')
        }

        if (user.status != 'approved') {
            throw new UnauthorizedException('รหัสผู้ใช้ยังไม่ได้รับอนุมติให้เข้าใช้งาน')
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


    async suLogin(email: string, suPassword: string) {
        const user = await this.usersRepository.findOne({
            select: ['UserId', 'FullName', 'SuPassword', 'Permission', 'status'],
            where: { email: email }
        })

        if (!user) {
            throw new NotFoundException('ไม่พบผู้ใช้ในระบบ')
        }

        if (user.status != 'approved') {
            throw new UnauthorizedException('รหัสผู้ใช้ยังไม่ได้รับอนุมติให้เข้าใช้งาน')
        }
        console.log(`suPassword: ${suPassword}`)
        // //compare password
        const isValid = await argon2.verify(user.SuPassword, suPassword)
        if (!isValid) {
            throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง')
        }

        //  สร้าง suToken
        const suToken = await this.jwtService.signAsync({
            userId: user.UserId,
            permission: user.Permission,
        }, {
            secret: environment.jwt_secrect
        })

        return { access_suToken: suToken }
    }



    async findAllUsers() {
        return await this.usersRepository.find({ 
            select: ['UserId', 'FullName', 'CodeUserId', 'email', 'Permission', 'status','Saleman']
         })
    }


    async findSaleMemberList(saleman: string) {
        console.log(`Saleman: ${saleman}`)
        return await this.usersRepository.find({ 
            select: ['UserId', 'FullName', 'CodeUserId', 'email', 'Permission', 'status','Saleman'],
            where: { Saleman: saleman} })
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
        user.SuPassword = await argon2.hash(registerDto.Password);
        user.Permission = registerDto.Permission;
        user.status = registerDto.status;

        return await this.usersRepository.save(user)
    }

    async userChangeEmail(changeEmailDto: ChangeEmailDto) {
        
        const {oldEmail , newEmail} = changeEmailDto;
        const user = await this.usersRepository.findOne({
            select: ['UserId', 'FullName', 'Password', 'Permission', 'status'],
            where: { email: oldEmail }
        })

        if (!user) {
            throw new NotFoundException('ไม่พบ email ที่ระบุในระบบ')
        }


        await this.usersRepository.update(user.UserId, { email: newEmail })
        return {
            "statusCode": 200,
            "message": "Update new Email OK",
        }
    }

    async userChangePwd(changePwdDto: ChangePwdDto) {
        
        const {email, oldPassword , newPassword} = changePwdDto;
        const user = await this.usersRepository.findOne({
            select: ['UserId', 'FullName', 'Password', 'Permission', 'status'],
            where: { email: email }
        })

        if (!user) {
            throw new NotFoundException('ไม่พบ email ที่ระบุในระบบ')
        }


        // ตรวจสอบว่า password เก่าว่าถูกต้องหรือไม่
        const isValid = await argon2.verify(user.Password, oldPassword)
        if (!isValid) {
            throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง')
        }

        // นำรหัสใส่ เข้ารหัส และ save
        const newPassHash = await argon2.hash(newPassword);
        console.log(`change Pass:${email}, ${oldPassword}, ${newPassword}, ${newPassHash}`)
        await this.usersRepository.update(user.UserId, { Password: newPassHash });
        return { 
            "statusCode": 200,
            "message": "new Password Updated OK" }
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



