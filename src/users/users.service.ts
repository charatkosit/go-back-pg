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
    const data = await this.usersRepository.find({ select: ['UserId', 'FullName', 'CodeUserId', 'email', 'Permission', 'status'] })
    if (!data) {
      throw new NotFoundException('ไม่พบคำที่ค้นหา');
    }
    return data;
  }

  async findOne(id: number) {
    const data = await this.usersRepository.findOne({ where: { UserId: id } })
    if (!data) {
      throw new NotFoundException('ไม่พบคำที่ค้นหา');
    }
    return data;
  }

  async findOneEmail(email: string) {
    const data = await this.usersRepository.findOne({ select: ['UserId'], where: { email: email } })
    if (!data) {
      throw new NotFoundException('ไม่พบคำที่ค้นหา');
    }
    return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this.usersRepository.update(id, updateUserDto)
  }

  async editProfile(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    await this.usersRepository.update(id, updateUserDto)
    return {
      "statusCode": 200,
      "message": "Updated OK"
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete({ UserId: id })
  }
}