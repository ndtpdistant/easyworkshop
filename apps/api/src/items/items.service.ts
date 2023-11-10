import { Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { CreateItemDto } from './dto/create-item-dto';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './items.model';

@Injectable()
export class ItemsService {
  constructor(
    private filesService: FilesService,
    @InjectModel(Item) private itemRepository: typeof Item,
  ) {}

  async uploadFile(dto: CreateItemDto, file: Express.Multer.File) {
    try {
      const fileUploadResponse = await this.filesService.uploadFile(file);
      console.log(fileUploadResponse);
      console.log(dto);

      const item = await this.itemRepository.create({
        user_id: +dto.user_id,
        item_name: dto.item_name,
        filepath: [`${fileUploadResponse}`],
      });
      return { message: 'Item created successfully' };
    } catch (error) {
      return { message: 'Error creating file' };
    }
  }

  async uploadFiles(dto: CreateItemDto, files: Array<Express.Multer.File>) {
    try {
      const fileUploadResponses = await Promise.all(
        files.map(async (file) => {
          const fileUploadResponse = await this.filesService.uploadFile(file);
          console.log(fileUploadResponse);
        }),
      );
      console.log(fileUploadResponses);
      console.log(dto);
      return { message: 'Items created successfully' };
    } catch (error) {
      console.log(3);
      return { message: 'Error creating file' };
    }
  }
}
