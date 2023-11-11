import { Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { CreateItemDto } from 'src/items/dto/create-item-dto';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from 'src/items/items.model';

@Injectable()
export class ItemsService {
  constructor(
    private filesService: FilesService,
    @InjectModel(Item) private itemRepository: typeof Item,
  ) {}

  async uploadFile(dto: CreateItemDto, file: Express.Multer.File) {
    try {
      const fileUploadResponse = await this.filesService.uploadFile(file);

      const item = await this.itemRepository.create({
        user_id: +dto.user_id,
        item_name: dto.item_name,
        filepath: [`${fileUploadResponse}`],
      });

      // console.log(item);

      // return { message: 'Item created successfully' };
      return item;
    } catch (error) {
      return { message: `Error creating file ${error}` };
    }
  }

  async uploadFiles(dto: CreateItemDto, files: Array<Express.Multer.File>) {
    try {
      const filepath = [];

      // idk why i have created this variable, but just let it be
      const fileUploadResponses = await Promise.all(
        files.map(async (file) => {
          const fileUploadResponse = await this.filesService.uploadFile(file);
          filepath.push(fileUploadResponse);
        }),
      );

      const items = await this.itemRepository.create({
        user_id: +dto.user_id,
        item_name: dto.item_name,
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
      limit: limit,
      offset: offset,
    });
    return items;
  }
}
