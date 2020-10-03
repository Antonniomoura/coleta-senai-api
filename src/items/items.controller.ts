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
    return await this.itemsService.getAllItems();
  }

  @Post()
  async createUser(@Body() createItem: ItemsDto): Promise<IItems>{
    return await this.itemsService.createItem(createItem);
  }
}
