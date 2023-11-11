import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/users.model';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

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
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const salt = await genUniqueSalt(this.userRepository);
    const password = await bcrypt.hash(dto.password, salt);

    const updatedDto = {
      ...dto,
      password: password,
      salt: salt,
    };

    const user = await this.userRepository.create(updatedDto);
    return user;
  }

  async getUser(login: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        [Op.or]: [{ username: login }, { email: login }],
      },
    });
    if (user) {
      if ((await bcrypt.hash(password, user?.salt)) === user.password) {
        return user;
      }
    }
    return;
  }

  // async deleteUser() {}

  // ONLY FOR DEV
  async getAll() {
    return this.userRepository.findAll();
  }
}
