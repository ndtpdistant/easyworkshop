import { Module } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentLike } from './comment-likes.model.ts';

@Module({
  providers: [CommentLikesService],
  imports: [SequelizeModule.forFeature([CommentLike])],
})
export class CommentLikesModule {}
