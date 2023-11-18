import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { Response } from 'express';
import { ChangeImageDto } from './dto/change-image.dto';
import { ChangeAboutDto } from './dto/change-about.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private decodeJwt(jwt) {
    return this.jwtService.decode(jwt.replace('Bearer ', ''));
  }

  // @Get()
  // getUser(@Query('login') login: string, @Query('password') password: string) {
  //   return this.usersService.getUser(login, password);
  // }

  // @Post()
  // createUser(@Body() dto: CreateUserDto) {
  //   return this.usersService.createUser(dto);
  // }

  @UseGuards(JwtAuthGuard)
  @Post('changeprofilepicture')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/jpg',
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          const error = new Error('Invalid file type. Only images are allowed');
          error.name = 'FileUploadError';
          callback(error, false);
        }
      },
    }),
  )
  changeProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Headers('Authorization') auth: string,
  ) {
    const id = this.decodeJwt(auth).sub;
    return this.usersService.changeProfilePicture(file, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('changebackgroundpicture')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/jpg',
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          const error = new Error('Invalid file type. Only images are allowed');
          error.name = 'FileUploadError';
          callback(error, false);
        }
      },
    }),
  )
  changeBackgroundPicture(
    @UploadedFile() file: Express.Multer.File,
    @Headers('Authorization') auth: string,
  ) {
    const id = this.decodeJwt(auth).sub;
    return this.usersService.changeBackgroundPicture(file, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('changeabout')
  changeAbout(
    @Body() dto: ChangeAboutDto,
    @Headers('Authorization') auth: string,
  ) {
    const id = this.decodeJwt(auth).sub;
    return this.usersService.changeAbout(id, dto.body.about);
  }

  @Get('profilepicture')
  getProfilePicture(@Query('id') id: number, @Res() res: Response) {
    return this.usersService.serveProfilePicture(id, res);
  }

  @Get('backgroundpicture')
  getBackgroundPicture(@Query('id') id: number, @Res() res: Response) {
    return this.usersService.serveBackgroundPicture(id, res);
  }

  @Get('userdata')
  getUserData(@Query('id') id: number) {
    return this.usersService.getUserData(id);
  }
}
