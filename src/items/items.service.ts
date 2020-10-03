import { Injectable } from '@nestjs/common';
import { IItems } from './interfaces/items.interface';
import { Model } from 'mongoose';
import { ItemsDto } from './dtos/create-items.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('items') private readonly userModel: Model<IItems>,
  ) {
  }

  async getAllUsers(): Promise<IItems[]> {
    return this.userModel.find().exec();
  }

  async createUser(createUserDto: ItemsDto): Promise<IItems> {
    return this.userModel.create(createUserDto);
  }

}
