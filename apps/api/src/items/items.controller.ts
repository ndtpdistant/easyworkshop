import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateItemDto } from 'src/items/dto/create-item-dto';
import { FilesService } from 'src/files/files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ItemsService } from 'src/items/items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}
  // stl, obj, gltf, glb

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createItem(
    @Body() dto: CreateItemDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.itemsService.uploadFile(dto, file);
  }

  @Post('createMultiple')
  @UseInterceptors(FilesInterceptor('files'))
  async createMultipleItems(
    @Body() dto: CreateItemDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.itemsService.uploadFiles(dto, files);
  }

  @Get()
  async getItems(@Query('limit') limit = 30, @Query('offset') offset = 0) {
    return await this.itemsService.getItems(limit, offset);
  }
}
