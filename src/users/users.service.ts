/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';
import * as argon2 from 'argon2'
import { NotFoundException } from '@nestjs/common/exceptions';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users)
  private usersRepository: Repository<Users>) {

  }
  async create(createUserDto: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.FullName = createUserDto.FullName;
    user.CodeUserId = createUserDto.CodeUserId;
    user.email = createUserDto.email;
    user.Password = await argon2.hash(createUserDto.Password);
    user.Permission = createUserDto.Permission;
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find( {select: ['UserId', 'FullName','CodeUserId', 'email', 'Permission','status']})
  }

  async findOne(id: number) {
      return await this.usersRepository.findOne({where: { UserId: id} })
      // ถ้าไม่มีรายชื่อ ควรแสดง error ออกไป
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<UpdateResult> {
    return await this.usersRepository.update(id,updateUserDto)
  }

  async remove(id: number) :  Promise<DeleteResult> {
    return await this.usersRepository.delete({UserId:id})
}
}