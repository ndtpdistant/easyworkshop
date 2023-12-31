import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { CreateItemDto } from 'src/items/dto/create-item-dto';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from 'src/items/items.model';
import { NotFoundError } from 'rxjs';
import { User } from 'src/users/users.model';

@Injectable()
export class ItemsService {
  constructor(
    private filesService: FilesService,
    @InjectModel(Item) private itemRepository: typeof Item,
  ) {}

  async createItem(
    id: number,
    dto: CreateItemDto,
    files: Array<Express.Multer.File>,
  ) {
    try {
      const filepath = [];
      // idk why i have created this variable, but just let it be
      // const fileUploadResponses = await Promise.all(
      //   );
      files.map(async (file) => {
        const fileUploadResponse = await this.filesService.uploadFile(file);
        filepath.push(fileUploadResponse);
      });

      const items = await this.itemRepository.create({
        user_id: id,
        item_name: dto.item_name,
        about: dto.about,
        filepath: filepath,
      });

      // return { message: 'Items created successfully' };
      return items;
    } catch (error) {
      console.log(3);
      return { message: 'Error creating file' };
    }
  }

  // get only 30 most relevant
  async getItems(limit: number, offset: number) {
    const items = await this.itemRepository.findAll({
      attributes: ['id'],
      limit: limit,
      offset: offset,
    });
    return items.map((item) => item.id);
  }

  async getItem(id) {
    const item = await this.itemRepository.findOne({ where: { id: id } });
    if (!item) {
      throw new NotFoundException({ message: 'Item not found' });
    }
    return item;
  }

  async serveItem(id) {
    try {
      const item = await this.itemRepository.findOne({
        where: { id: id },
      });
      return item;
    } catch (error) {
      throw new NotFoundException({ message: 'Item not found!' });
    }
  }

  async serveItemUser(id) {
    try {
      const item = await this.itemRepository.findOne({
        where: { id: id },
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'email', 'first_name', 'last_name'],
          },
        ],
      });
      const user = item.user.dataValues;
      return user;
    } catch (error) {
      throw new NotFoundException({ message: 'Item not found!' });
    }
  }
}
