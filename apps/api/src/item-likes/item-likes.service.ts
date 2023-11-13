import { Injectable } from '@nestjs/common';
import { LikeItemDto } from './dto/like-item.dto';
import { ItemLike } from './item-likes.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ItemLikesService {
  constructor(
    @InjectModel(ItemLike) private itemLikesRepository: typeof ItemLike,
  ) {}
  async likeItem(dto: LikeItemDto): Promise<boolean> {
    const like = await this.itemLikesRepository.findOne({
      where: {
        user_id: dto.body.user_id,
        item_id: dto.body.item_id,
      },
    });
    if (like) {
      await like.destroy();
      return true;
    } else {
      this.itemLikesRepository.create(dto);
      return true;
    }
  }
}
