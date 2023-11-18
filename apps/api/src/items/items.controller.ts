import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
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

  // @Post('create') 
  // async createItem()
  // stl, obj, gltf, glb
  // not multiple items, but multiple files for one item
  // @UseGuards(JwtAuthGuard)
  // @Post('create')
  // @UseInterceptors(FilesInterceptor('files'))
  // async createItem(
  //   @Body() dto: CreateItemDto,
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Headers('Authorization') auth: string,
  // ) {
  //   console.log(123213);
  //   const id = +this.decode(auth).sub;
  //   // console.log(dto, req.files);
  //   console.log(files);
  //   return true;
  //   // return this.itemsService.createItem(id, dto, files);
  // }

  @Get()
  async getItems(@Query('limit') limit = 30, @Query('offset') offset = 0) {
    return await this.itemsService.getItems(limit, offset);
  }

  @Get()
  async getItem(@Query('id') id) {
    return await this.itemsService.getItem(id);
  }
}
