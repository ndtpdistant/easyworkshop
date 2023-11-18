import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto } from 'src/auth/dto/sign-in-dto';
import { SignUpDto } from 'src/auth/dto/sign-up-dto';
import { VerificationDto } from './dto/verification-dto';
import { SendVerificationCodeDto } from './dto/send-verifiaction-code.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Post('registration')
  signUp(@Body() dto: SignUpDto) {
    console.log(dto);
    return this.authService.signUp(dto);
  }

  @Post('verification')
  verification(@Body() dto: VerificationDto) {
    return this.authService.verification(dto);
  }

  @Post('sendverificationcode')
  sendVerificationCode(@Body() dto: SendVerificationCodeDto) {
    return this.authService.sendVerificationCode(dto);
  }

  @Post('forgotpassword')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }
}
