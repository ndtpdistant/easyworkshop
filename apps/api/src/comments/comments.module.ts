import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CommentsController } from './comments.controller';

@Module({
  providers: [CommentsService],
  imports: [SequelizeModule.forFeature([Comment])],
  controllers: [CommentsController],
})
export class CommentsModule {}
