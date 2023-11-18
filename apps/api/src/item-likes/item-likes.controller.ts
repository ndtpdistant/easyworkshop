import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { LikeItemDto } from './dto/like-item.dto';
import { ItemLikesService } from './item-likes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('item-likes')
export class ItemLikesController {
  constructor(private itemLikesService: ItemLikesService) {}

  @Post()
  likeItem(@Body() dto: LikeItemDto): Promise<boolean> {
    return this.itemLikesService.likeItem(dto);
  }

  @Get()
  getItemLikes(@Query('id') comment_id: number) {
    return this.itemLikesService.getItemLikes(comment_id);
  }

  // you need jwt token for this request
  @UseGuards(JwtAuthGuard)
  @Get()
  hasUserLikedItem(
    @Query('user_id') user_id: number,
    @Query('item_id') item_id: number,
  ): Promise<boolean> {
    return this.itemLikesService.hasUserLikedItem(user_id, item_id);
  }
}
