import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsSchema } from './schemas/items.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'items', schema: ItemsSchema }]),
  ],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {
}
