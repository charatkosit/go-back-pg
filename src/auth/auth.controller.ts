/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userInfo } from 'os';
import { Register } from 'src/interfaces/Register';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto, SuLoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ChangePasswordDto } from './dto/ChangePasswordDto';
import { AdminChangePasswordDto } from './dto/AdminChangePasswordDto';
import { env } from 'process';
import { environment } from 'src/environments/environment';
import { ApproveDto } from './dto/ApproveDto';
import { ForgotPasswordDto } from './dto/ForgotPasswordDto';
import { SaleMemberListDto } from './dto/SaleMemberListDto';
import { AdminChangeSuPasswordDto } from './dto/AdminChangeSuPasswordDto';

@Controller({
    version: '1',
    path: 'auth'
})
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly usersService: UsersService) { }

    //localhost:3000/api/v1/auth/users
    @UseGuards(JwtAuthGuard)
    @Get('users')
    findAllUsers() {
        return this.authService.findAllUsers();
    }


    //localhost:3000/api/v1/auth/sale-member-list
    @UseGuards(JwtAuthGuard)
    @Post('sale-member-list')
    saleMemberList(@Body() saleMemberListDto: SaleMemberListDto) {
        const { saleman } = saleMemberListDto;
        return this.authService.findSaleMemberList(saleman);
    }

    //localhost:3000/api/v1/auth/backRev
    @Get('backRev')
    getVersion() {
        return { backRev: environment.release }
        // return { backRev : '0.1.12'}
    }

    //localhost:3000/api/v1/auth/login
    @Post('login')
    // @UsePipes(ValidationPipe)
    @HttpCode(200)
    login(@Body() loginDto: LoginDto) {
        // console.log(loginDto)
        return this.authService.login(loginDto.email, loginDto.password)

    }

    //localhost:3000/api/v1/auth/suLogin
    @Post('suLogin')
    // @UsePipes(ValidationPipe)
    @HttpCode(200)
    suLogin(@Body() suLoginDto: SuLoginDto) {
        //  console.log(suLoginDto)
        return this.authService.suLogin(suLoginDto.email, suLoginDto.suPassword)

    }

    //localhost:3000/api/v1/auth/approve + with token access
    @Post('approve')
    @UseGuards(JwtAuthGuard)
    approve(@Body() approveDto: ApproveDto) {
        // console.log(approveDto)
        return this.authService.approve(approveDto.email)

    }

    // localhost:3000/api/v1/auth/register
    @Post('register')
    // @UsePipes(ValidationPipe)
    register(@Body() registerDto: RegisterDto) {
        const { FullName, CodeUserId, Email,
            Password, Permission } = registerDto;
        console.log(`${FullName}, ${CodeUserId}, ${Email}, ${Password}, ${Permission}`)
        return this.authService.register(registerDto)
    }


    // localhost:3000/api/v1/auth/forgotPassowrd
    @Post('forgotPassword')
    // @UsePipes(ValidationPipe)
    forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        const { email } = forgotPasswordDto;
        // console.log(`${email}`)
        return this.authService.forgotPassword(email)
    }

    // localhost:3000/api/v1/auth/profiles  + with token access
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req: any) {
        console.log(req)
        return req.user;
    }


    // localhost:3000/api/v1/auth/userChangePassword
    @Patch('changePassword')
    // @UsePipes(ValidationPipe)
    userChangePasswd(@Body() changePasswordDto: ChangePasswordDto) {
        const { Token, Email, oldPassword, newPassword } = changePasswordDto;
        console.log(`${Token}, ${Email}, ${oldPassword}`)
        return this.authService.userChangePassword(Email, oldPassword, newPassword)
    }


    // localhost:3000/api/v1/auth/adminChangePassword
    @Patch('adminChangePassword')
    // @UsePipes(ValidationPipe)
    adminChangePassword(@Body() adminChangePasswordDto: AdminChangePasswordDto) {
        const { Email, newPassword } = adminChangePasswordDto;
        console.log(`${Email} , ${newPassword}`)
        return this.authService.adminChangePassword(Email, newPassword)
    }


    // localhost:3000/api/v1/auth/adminChangeSuPassword
    @Patch('adminChangeSuPassword')
    // @UsePipes(ValidationPipe)
    adminChangeSuPassword(@Body() adminChangeSuPasswordDto: AdminChangeSuPasswordDto) {
        const { Email, newSuPassword } = adminChangeSuPasswordDto;
        console.log(`${Email} , ${newSuPassword}`)
        return this.authService.adminChangeSuPassword(Email, newSuPassword)
    }
}



