import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  @Get()
  async getAllUsers(): Promise<IUser[]> {
    return await this.usersService.getAllUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<IUser>{
    return await this.usersService.createUser(createUserDto);
  }

  @Delete(':_id')
  async deleteUser(@Param('_id') _id: string): Promise<void> {
    await this.usersService.deleteUser(_id);
  }

  @Put(':_id')
  async updateUser(
    @Body() createUserDto: UpdateUserDto,
    @Param('_id') _id: string
  ): Promise<IUser> {
    return await this.usersService.updateUser(_id, createUserDto);
  }

}
