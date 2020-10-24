import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPoint } from './interfaces/point.interface';
import { PointDto } from './dtos/create-point.dto';

@Injectable()
export class PointsService {
  constructor(
    @InjectModel('points') private readonly pointModel: Model<IPoint>,
  ) {
  }

  async getAllPoints(): Promise<IPoint[]> {
    return this.pointModel.find().exec();
  }

  async createPoints(createItem: PointDto): Promise<IPoint> {
    return this.pointModel.create(createItem);
  }

  async updatePoints(_id: string, createItem: PointDto): Promise<IPoint> {
    return await this.pointModel.findOneAndUpdate({ _id },
      { $set: createItem }).exec();
  }

  async deleteUser(_id: string): Promise<any> {
    return await this.pointModel.findByIdAndRemove(_id).exec();
  }

}
