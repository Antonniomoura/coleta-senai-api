import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemsDto } from './dtos/create-items.dto';
import { IItems } from './interfaces/items.interface';
import { ItemsService } from './items.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
  ) {
  }
  @Get()
  async getAllItems(): Promise<IItems[]> {
    return await this.itemsService.getAllItems();
  }

  @Post()
  async createItems(@Body() createItem: ItemsDto): Promise<IItems>{
    return await this.itemsService.createItem(createItem);
  }
}
