import { Body, Controller, Post } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { LikeCommentDto } from './dto/like-comment.dto';

@Controller('comment-likes')
export class CommentLikesController {
  constructor(private commentLikesService: CommentLikesService) {}

  @Post()
  likeComment(@Body() dto: LikeCommentDto) {
    return this.commentLikesService.likeComment(dto);
  }
}
