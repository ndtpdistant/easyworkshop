import { Controller, Get, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get()
  getItemComments(@Query('item_id') item_id: number) {
    return this.commentsService.getCommentsWithChildren(item_id);
  }
}
