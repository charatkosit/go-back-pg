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
import { ChangeEmailDto } from './dto/ChangeEmailDto';
import { ChangePwdDto } from './dto/ChangePwdDto';

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


    // localhost:3000/api/v1/auth/profiles  + with token access
    // @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req: any) {
        console.log(JSON.stringify(req.user))
        return 'hello';
    }

    // localhost:3000/api/v1/auth/fullname  + with token access
    // @UseGuards(JwtAuthGuard)
    @Get('fullname')
    getFullname(@Body('id') id: number) {
        // console.log()
        return this.authService.fullname(id);

    }
}



