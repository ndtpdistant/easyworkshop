import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filename = `${Date.now()}_${file.originalname}`;

    const filepath = path.join(uploadDir, filename);
    try {
      fs.writeFileSync(filepath, file.buffer);
      return filepath;
    } catch (error) {
      console.error('Error saving file: ', error.message);
      throw new Error('File upload failed');
    }
  }

  serveFile(path: string, res: Response) {
    try {
      // const file = fs.readFileSync(path);
      // return file;
      return res.sendFile(path, { root: './' });
      // console.log(res.sendFile(path, { root: './' }));
    } catch (error) {
      console.error('Error serving file:', error);
      throw new InternalServerErrorException({ message: 'Error serving file' });
    }
  }

  deleteFile(path: string) {
    fs.unlinkSync(path);
  }
}
