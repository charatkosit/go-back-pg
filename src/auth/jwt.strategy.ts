/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { environment } from "src/environments/environment";
import { Users } from "src/users/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(Users) 
                 private readonly userRepository:Repository<Users> ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: environment.jwt_secrect
        })
    }

    async validate(payload: any){
          console.log(`payload is ${payload}`)
            const user = await this.userRepository.findOne( {where: {UserId: payload.userId}})
            if(!user){
                throw new NotFoundException('ไม่พบผู้ใช้งานในระบบ')
            }
        return {
            id: user.UserId,
            fullName: user.FullName,
            codeUserId: user.CodeUserId,
            email: user.email,
            permission: user.Permission
        }
    }

}