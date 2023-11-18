import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User]), FilesModule],
  exports: [UsersService],
})
export class UsersModule {}
