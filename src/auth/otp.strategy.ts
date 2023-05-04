/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-otp';
import { AuthService } from './auth.service';

@Injectable()
export class OtpStrategy extends PassportStrategy(Strategy, 'otp') {
  constructor(private readonly authService: AuthService) {
    super({
      // กำหนดคีย์สำหรับการเข้ารหัสและถอดรหัส OTP
      otpSecretField: 'otpSecret',
      otpVerificationField: 'otpVerification',
      // กำหนดฟังก์ชันในการตรวจสอบ OTP และเรียกใช้งาน AuthService
      verify: async (req, token, done) => {
        try {
          const isValid = await this.authService.verifyOtp(token, req.user);
          done(null, isValid);
        } catch (err) {
          done(err);
        }
      },
    });
  }
}
