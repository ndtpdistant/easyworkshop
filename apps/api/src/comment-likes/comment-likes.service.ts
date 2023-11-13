import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CommentLike } from './comment-likes.model.ts';
import { LikeCommentDto } from './dto/like-comment.dto.js';

@Injectable()
export class CommentLikesService {
  constructor(
    @InjectModel(CommentLike)
    private commentLikesRepository: typeof CommentLike,
  ) {}
  async likeItem(dto: LikeCommentDto): Promise<boolean> {
    const like = await this.commentLikesRepository.findOne({
      where: {
        user_id: dto.body.user_id,
        comment_id: dto.body.comment_id,
      },
    });
    if (like) {
      await like.destroy();
      return true; // what should i return
    } else {
      this.commentLikesRepository.create(dto);
      return true; // what should i return
    }
  }
}
