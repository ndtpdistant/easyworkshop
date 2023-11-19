import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateItemDto } from 'src/items/dto/create-item-dto';
import { FilesService } from 'src/files/files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ItemsService } from 'src/items/items.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('items')
export class ItemsController {
  constructor(
    private itemsService: ItemsService,
    private jwtService: JwtService,
  ) {}

  private decode(jwt) {
    return this.jwtService.decode(jwt.replace('Bearer ', ''));
  }

  // stl, obj, gltf, glb
  // not multiple items, but multiple files for one item
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  async createItem(
    @Body() dto: CreateItemDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Headers('Authorization') auth: string,
  ) {
    const id = +this.decode(auth).sub;
    return this.itemsService.createItem(id, dto, files);
  }

  @Get('getitemslist')
  async getItemsList(@Query('limit') limit = 30, @Query('offset') offset = 0) {
    return await this.itemsService.getItems(limit, offset);
  }

  @Get('item')
  async getItem(@Query('id') id) {
    return await this.itemsService.serveItem(id);
  }

  @Get('itemuser')
  async getItemUser(@Query('id') id) {
    return await this.itemsService.serveItemUser(id);
  }
}
