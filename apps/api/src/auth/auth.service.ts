import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from 'src/auth/dto/sign-in-dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/auth/dto/sign-up-dto';
import { MailService } from 'src/mail/mail.service';
import { VerificationDto } from './dto/verification-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  private generateVerificationCode(): string {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min + '';
  }

  async signIn(dto: SignInDto) {
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
    const checkUser = await this.usersService.getUserByEmail(dto.body.email);
    if (checkUser && !checkUser.is_verified) {
      const verification_code = this.generateVerificationCode();
      this.mailService.sendVerificationEmail(dto.body.email, verification_code);
      this.usersService.addVerivicationCode(checkUser.id, verification_code);
      return {
        message:
          'Seems like you already tried to create an account. Verification email sent.',
      };
    }

    const user = await this.usersService.createUser(dto.body);

    const verification_code = this.generateVerificationCode();
    this.mailService.sendVerificationEmail(dto.body.email, verification_code);
    this.usersService.addVerivicationCode(user.id, verification_code);
    return { message: 'Signup successful. Verification email sent.' };
  }

  async verification(dto: VerificationDto) {
    const user = await this.usersService.getUser(
      dto.body.email,
      dto.body.password,
    );
    if (user) {
      if (user.verification_code == dto.body.verification_code) {
        this.usersService.addVerifiedStatus(user.id);
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
      } else {
        return false;
      }
    } else {
      return new NotFoundException('User Not Found');
    }
  }
}
