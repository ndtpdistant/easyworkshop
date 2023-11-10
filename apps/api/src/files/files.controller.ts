import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     dest: './uploads',
  //   }),
  // )
  // uploadFiles(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }
}
