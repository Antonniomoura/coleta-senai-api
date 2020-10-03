import { Body, Controller, Get, Post } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointDto } from './dtos/create-point.dto';
import { IPoint } from './interfaces/point.interface';

@Controller('points')
export class PointsController {
  constructor(
    private readonly pointsService: PointsService,
  ) {
  }

  @Get()
  async getAllPoints(): Promise<IPoint[]> {
    return await this.pointsService.getAllPoints();
  }

  @Post()
  async createPoints(@Body() createItem: PointDto): Promise<IPoint> {
    return await this.pointsService.createPoints(createItem);
  }
}
