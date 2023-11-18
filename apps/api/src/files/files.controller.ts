import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}
  @Get()
  serveFile(@Query('path') path: string, @Res() res: Response) {
    return this.filesService.serveFile(path, res);
  }
}
