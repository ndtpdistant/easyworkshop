import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUser(@Query('login') login: string, @Query('password') password: string) {
    return { login: login, password: password };
  }

  @Post()
  createUser() {
    return { username: 'user' };
  }
}
