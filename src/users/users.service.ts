import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

import * as sha256 from 'sha256';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<IUser>,
  ) {
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const user = await this.userModel.findOne({ email: createUserDto.email }).exec();

    if (user) {
      throw new ConflictException(`E-mail ${user.email} já cadastrado!!!`);
    }

    createUserDto.password = sha256(createUserDto.password);

    return this.userModel.create(createUserDto);
  }

  async deleteUser(_id: string): Promise<any> {
    const user = await this.findUserById(_id);
    console.log(user);
    if (!user) {
      throw new NotFoundException(`Usuario com indetifcador ${_id} não encontrado!!`);
    }

    await this.userModel.findByIdAndRemove(_id).exec();
    return { deleted: true };
  }

  async findUserById(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`Usuario com indetifcador ${id} não encontrado!!`);
    }

    return user;
  }

  async updateUser(_id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const user = await this.userModel.findById(_id).exec();
    if (!user) {
      throw new NotFoundException(`Usuario com indetifcador ${_id} não encontrado!!`);
    }
    return await this.userModel.findOneAndUpdate({ _id },
      { $set: updateUserDto }).exec();
  }

  async findOne(email: string): Promise<any | undefined> {
    return await this.userModel.findOne({ email }).exec();
  }

  public async findOneByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<IUser> {
    return await this.userModel.findOne({
      email: { $eq: email },
      password: { $eq: sha256(password) },
    });
  }
}
