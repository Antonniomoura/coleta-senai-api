import { Injectable } from '@nestjs/common';
import { IItems } from './interfaces/items.interface';
import { Model } from 'mongoose';
import { ItemsDto } from './dtos/create-items.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('items') private readonly itemModel: Model<IItems>,
  ) {
  }

  async getAllItems(): Promise<IItems[]> {
    return this.itemModel.find().exec();
  }

  async createItem(createItem: ItemsDto): Promise<IItems> {
    return this.itemModel.create(createItem);
  }

}
