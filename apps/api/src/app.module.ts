import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { FilesModule } from 'src/files/files.module';
import { ItemsController } from 'src/items/items.controller';
import { ItemsService } from 'src/items/items.service';
import { ItemsModule } from 'src/items/items.module';
import { Item } from 'src/items/items.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      models: [User, Item],
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
