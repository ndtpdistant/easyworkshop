import { Module } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentLike } from './comment-likes.model.ts';
import { CommentLikesController } from './comment-likes.controller';

@Module({
  providers: [CommentLikesService],
  imports: [SequelizeModule.forFeature([CommentLike])],
  controllers: [CommentLikesController],
})
export class CommentLikesModule {}
