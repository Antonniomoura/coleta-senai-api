import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointDto } from './dtos/create-point.dto';
import { IPoint } from './interfaces/point.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Points')
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

  @Put(':_id')
  async updateExpense(
    @Body() createPoint: PointDto,
    @Param('_id') _id: string,
  ): Promise<IPoint> {
    return await this.pointsService.updatePoints(_id, createPoint);
  }
}
