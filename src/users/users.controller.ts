/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EditUserProfileDto } from './dto/edit-user-profile';

@Controller(
  {
    version: '1',
    path: 'users'
  }
)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  
  // localhost:3000/api/v1/users/editProfile/3   @Patch('editProfile/:id')
  @UseGuards(JwtAuthGuard)
  @Patch('editProfile/:id')
  // @UsePipes(ValidationPipe)
  editProfile(@Param('id') id: any,@Body() editUserProfileDto: EditUserProfileDto) {
    const { FullName, CodeUserId, email, Permission   } = editUserProfileDto;
    console.log(`${FullName} , ${CodeUserId},${email}, ${Permission}`)
    return this.usersService.editProfile(+id, editUserProfileDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
