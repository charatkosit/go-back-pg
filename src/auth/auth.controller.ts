/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Login } from 'src/interfaces/Login';
import { AuthService } from './auth.service';

@Controller({
    version: '1',
    path:'auth'})
export class AuthController {
    constructor(private readonly authService:AuthService) {
        
    }
    @Post('login')
    @HttpCode(200)
    login(@Body() body:Login) {  
        return this.authService.login(body.email, body.password)

    }
}
function httpCode(arg0: number) {
    throw new Error('Function not implemented.');
}

