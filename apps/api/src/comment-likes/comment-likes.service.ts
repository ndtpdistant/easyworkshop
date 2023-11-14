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
  async likeComment(dto: LikeCommentDto): Promise<boolean> {
    const like = await this.commentLikesRepository.findOne({
      where: {
        user_id: dto.body.user_id,
        comment_id: dto.body.comment_id,
      },
    });
    if (like) {
      await like.destroy();
      return true;
    } else {
      this.commentLikesRepository.create(dto);
      return true;
    }
  }

  async getCommentLikes(comment_id: number) {
    return await this.commentLikesRepository.findAll({
      where: { comment_id: comment_id },
    });
  }

  async hasUserLikedComment(
    user_id: number,
    comment_id: number,
  ): Promise<boolean> {
    const like = await this.commentLikesRepository.findOne({
      where: { user_id: user_id, comment_id: comment_id },
    });
    if (like) {
      return true;
    } else {
      return false;
    }
  }
}
