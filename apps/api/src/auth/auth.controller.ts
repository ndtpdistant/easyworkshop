import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto } from 'src/auth/dto/sign-in-dto';
import { SignUpDto } from 'src/auth/dto/sign-up-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Post('registration')
  signUp(@Body() dto: SignUpDto) {
    console.log(dto.body)
    return this.authService.signUp(dto);
  }
}
