import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { FilesModule } from 'src/files/files.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './items.model';

@Module({
  imports: [FilesModule, SequelizeModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsModule],
})
export class ItemsModule {}
