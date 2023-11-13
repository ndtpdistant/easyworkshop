import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comments.model';

@Module({
  providers: [CommentsService],
  imports: [SequelizeModule.forFeature([Comment])],
})
export class CommentsModule {}
