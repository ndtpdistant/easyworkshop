import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/users.model';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FilesService } from 'src/files/files.service';
import { Response } from 'express';
import { ChangeImageDto } from './dto/change-image.dto';

async function genUniqueSalt(userRepository: typeof User) {
  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  while (true) {
    const collision = await userRepository.findOne({
      where: { salt: salt },
    });
    if (collision) {
      salt = await bcrypt.genSalt(saltRounds);
    } else {
      return salt;
    }
  }
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private filesService: FilesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const salt = await genUniqueSalt(this.userRepository);
    const password = await bcrypt.hash(dto.password, salt);

    const updatedDto = {
      ...dto,
      password: password,
      salt: salt,
    };
    try {
      console.log(updatedDto);
      const user = await this.userRepository.create(updatedDto);
      return user;
    } catch (error) {
      if (error.errors) {
        for (const validationError of error.errors) {
          if (validationError.type === 'unique violation') {
            if (validationError.path === 'email') {
              throw new HttpException(
                'Email is already in use',
                HttpStatus.BAD_REQUEST,
              );
            } else if (validationError.path === 'username') {
              throw new HttpException(
                'Username is already in use',
                HttpStatus.BAD_REQUEST,
              );
            }
          }
        }
      }

      // Handle other types of errors here, or rethrow the original error
      throw error;
    }
  }

  async getUser(login: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        [Op.or]: [{ username: login }, { email: login }],
      },
    });
    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }
    if (user) {
      if ((await bcrypt.hash(password, user?.salt)) === user.password) {
        return user;
      }
    }
    return;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (user) {
      return user;
    }
    return;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (user) {
      return user;
    }
    return;
  }

  async getUserData(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (user) {
        const data = {
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          about: user.about,
        };
        return data;
      }
    } catch (e) {
      throw new NotFoundException({ message: 'User not found' });
    }
    return;
  }
  // async deleteUser() {}
  async addVerivicationCode(id: number, verification_code: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user) {
      user.verification_code = verification_code;
      await user.save();
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async addVerifiedStatus(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user) {
      user.is_verified = true;
      await user.save();
    } else {
      throw new NotFoundException('User not found');
    }
  }
  // ONLY FOR DEV
  async getAll() {
    return this.userRepository.findAll();
  }

  async changeProfilePicture(file: Express.Multer.File, id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        throw new NotFoundException({ message: 'User not found' });
      }
      if (user.profile_picture) {
        this.filesService.deleteFile(user.profile_picture);
      }
      const fileUploadResponse = await this.filesService.uploadFile(file);
      user.profile_picture = fileUploadResponse;
      await user.save();

      return { message: 'Profile picture changed successfully!' };
    } catch (error) {
      return { message: `Error creating file ${error}` };
    }
  }

  async changeBackgroundPicture(file: Express.Multer.File, id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });

      if (!user) {
        throw new NotFoundException({ message: 'User not found' });
      }

      if (user.background_picture) {
        this.filesService.deleteFile(user.background_picture);
      }

      const fileUploadResponse = await this.filesService.uploadFile(file);
      user.background_picture = fileUploadResponse;
      await user.save();

      return { message: 'Background picture changed successfully!' };
    } catch (error) {
      return { message: `Error creating file ${error}` };
    }
  }

  async serveProfilePicture(id: number, res: Response) {
    const user = await this.getUserById(id);
    if (!user) {
      throw BadRequestException;
    }
    try {
      this.filesService.serveFile(user.profile_picture, res);
    } catch (e) {
      throw new NotFoundException({ message: 'Profile picture not found' });
    }
  }

  async serveBackgroundPicture(id: number, res: Response) {
    const user = await this.getUserById(id);
    if (!user) {
      throw BadRequestException;
    }
    try {
      this.filesService.serveFile(user.background_picture, res);
    } catch (e) {
      throw new NotFoundException({ message: 'Background picture not found' });
    }
  }

  async changeAbout(id: number, about: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      user.about = about;
      user.save;
    } catch (e) {
      throw new NotFoundException({ message: 'User not found' });
    }
  }
}
