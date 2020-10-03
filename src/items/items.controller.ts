import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemsDto } from './dtos/create-items.dto';
import { IItems } from './interfaces/items.interface';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
  ) {
  }
  @Get()
  async getAllUsers(): Promise<IItems[]> {
    return await this.itemsService.getAllUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: ItemsDto): Promise<IItems>{
    return await this.itemsService.createUser(createUserDto);
  }
}
