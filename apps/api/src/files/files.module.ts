import { Module } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { FilesController } from 'src/files/files.controller';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
