import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
