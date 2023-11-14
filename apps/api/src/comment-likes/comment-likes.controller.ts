import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { LikeCommentDto } from './dto/like-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('comment-likes')
export class CommentLikesController {
  constructor(private commentLikesService: CommentLikesService) {}

  @Post()
  likeComment(@Body() dto: LikeCommentDto) {
    return this.commentLikesService.likeComment(dto);
  }

  @Get()
  getCommentLikes(@Query('id') comment_id: number) {
    return this.commentLikesService.getCommentLikes(comment_id);
  }

  // you need jwt token for this request
  @UseGuards(JwtAuthGuard)
  @Get()
  hasUserLikedItem(
    @Query('user_id') user_id: number,
    @Query('comment_id') comment_id: number,
  ): Promise<boolean> {
    return this.commentLikesService.hasUserLikedComment(user_id, comment_id);
  }
}
