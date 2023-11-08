import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in-dto';
import { CreateUserDto } from 'src/users/dto/create-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() dto: SignInDto) {
    console.log(dto)
    return this.authService.signIn(dto);
  }

  @Post('registration')
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }
}
