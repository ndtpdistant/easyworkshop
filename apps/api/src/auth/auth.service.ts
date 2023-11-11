import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from 'src/auth/dto/sign-in-dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/auth/dto/sign-up-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDto) {
    console.log(dto.body);

    const user = await this.usersService.getUser(
      dto.body.login,
      dto.body.password,
    );
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

  async signUp(dto: SignUpDto) {
    const user = await this.usersService.createUser(dto.body);
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
