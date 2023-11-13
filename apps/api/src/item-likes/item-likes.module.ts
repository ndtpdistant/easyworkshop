import { Module } from '@nestjs/common';
import { ItemLikesService } from './item-likes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemLike } from './item-likes.model';

@Module({
  providers: [ItemLikesService],
  imports: [SequelizeModule.forFeature([ItemLike])],
})
export class ItemLikesModule {}
