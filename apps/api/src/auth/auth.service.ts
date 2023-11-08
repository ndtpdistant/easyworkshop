import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in-dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDto) {
    const user = await this.usersService.getUser(dto.login, dto.password);
    if (!user) {
      throw UnauthorizedException;
    }
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(dto: CreateUserDto) {
    const user = await this.usersService.createUser(dto);
    if (!user) {
      throw BadRequestException;
    }

    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
