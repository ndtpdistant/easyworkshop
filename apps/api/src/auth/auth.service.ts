import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from 'src/auth/dto/sign-in-dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/auth/dto/sign-up-dto';
import { MailService } from 'src/mail/mail.service';
import { VerificationDto } from './dto/verification-dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { SendVerificationCodeDto } from './dto/send-verifiaction-code.dto';

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
    try {
      const user = await this.usersService.getUser(
        dto.body.login,
        dto.body.password,
      );
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
    } catch (error) {
      throw new BadRequestException({ message: 'Wrong data' });
    }
  }

  async signUp(dto: SignUpDto) {
    try {
      const exsistingUser = await this.usersService.getUserByEmail(
        dto.body.email,
      );
      if (exsistingUser && !exsistingUser.is_verified) {
        const verification_code = this.generateVerificationCode();
        this.mailService.sendVerificationEmail(
          dto.body.email,
          verification_code,
        );
        this.usersService.addVerivicationCode(
          exsistingUser.id,
          verification_code,
        );
        return {
          message:
            'Seems like you already tried to create an account. Verification email sent.',
          status: true,
        };
      } else if (exsistingUser && exsistingUser.is_verified) {
        return {
          message: 'You already have an account. Try to sign in.',
          status: false,
        };
      }
    } catch (error) {
      console.log(error);
    }

    const user = await this.usersService.createUser(dto.body);

    const verification_code = this.generateVerificationCode();
    this.mailService.sendVerificationEmail(dto.body.email, verification_code);
    this.usersService.addVerivicationCode(user.id, verification_code);
    return {
      message: 'Signup successful. Verification email sent.',
      status: true,
    };
  }

  async verification(dto: VerificationDto) {
    const user = await this.usersService.getUser(
      dto.body.email,
      dto.body.password,
    );
    console.log(user);
    console.log(dto.body.verification_code);
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

  async sendVerificationCode(dto: SendVerificationCodeDto) {
    try {
      const user = await this.usersService.getUserByEmail(dto.body.email);
      const verification_code = this.generateVerificationCode();
      this.mailService.sendVerificationEmail(user.email, verification_code);
      user.verification_code = verification_code;
      user.save();
      return { message: 'Verification code has been sent.' };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    try {
      const user = await this.usersService.getUserByEmail(dto.body.email);
      console.log(user.verification_code);
      if (user.verification_code == dto.body.verification_code) {
        this.usersService.createNewPassword(
          dto.body.email,
          dto.body.new_password,
        );
        return {
          message: 'Password has been changed. Try to sign in now.',
          status: true,
        };
      }
      return {
        message: 'Wrong verification code. Try again with new code.',
        status: false,
      };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
