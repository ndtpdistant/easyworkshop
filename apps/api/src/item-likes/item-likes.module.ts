import { Module } from '@nestjs/common';
import { ItemLikesService } from './item-likes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemLike } from './item-likes.model';
import { ItemLikesController } from './item-likes.controller';

@Module({
  providers: [ItemLikesService],
  imports: [SequelizeModule.forFeature([ItemLike])],
  controllers: [ItemLikesController],
})
export class ItemLikesModule {}
