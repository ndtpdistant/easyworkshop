import { Body, Controller, Post } from '@nestjs/common';
import { LikeItemDto } from './dto/like-item.dto';
import { ItemLikesService } from './item-likes.service';

@Controller('item-likes')
export class ItemLikesController {
  constructor(private itemLikesService: ItemLikesService) {}

  @Post()
  likeItem(@Body() dto: LikeItemDto): Promise<boolean> {
    return this.itemLikesService.likeItem(dto);
  }
}
