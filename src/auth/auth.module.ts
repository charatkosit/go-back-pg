/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
@Module({
  imports:[
    UsersModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '7d'},
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AuthService,
              UsersService,
              JwtStrategy,
            ],
  controllers: [AuthController],

})
export class AuthModule {}
