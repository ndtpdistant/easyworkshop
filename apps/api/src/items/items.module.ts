import { Module } from '@nestjs/common';
import { ItemsController } from 'src/items/items.controller';
import { ItemsService } from 'src/items/items.service';
import { FilesModule } from 'src/files/files.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from 'src/items/items.model';

@Module({
  imports: [FilesModule, SequelizeModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsModule],
})
export class ItemsModule {}
