/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userInfo } from 'os';
import { Register } from 'src/interfaces/Register';
import { Users } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller({
    version: '1',
    path:'auth'})
export class AuthController {
    constructor(private readonly authService:AuthService) {
        
    }
    //localhost:3000/api/v1/auth/login
    @Post('login')
    @HttpCode(200)
    login(@Body() loginDto: LoginDto) {  
        // console.log(loginDto)
        return this.authService.login(loginDto.email, loginDto.password)

    }


    @Post('register')
    register(@Body() body:Register){
    return this.authService.register(body)
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    profile(@Req() req:any){
        console.log(req)
    }
}



