import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { FilesModule } from 'src/files/files.module';
import { ItemsModule } from 'src/items/items.module';
import { Item } from 'src/items/items.model';
import { MailModule } from './mail/mail.module';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comments.model';
import { CommentLikesModule } from './comment-likes/comment-likes.module';
import { ItemLikesModule } from './item-likes/item-likes.module';
import { CommentLike } from './comment-likes/comment-likes.model.ts';
import { ItemLike } from './item-likes/item-likes.model';

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
      models: [User, Item, Comment, CommentLike, ItemLike],
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    ItemsModule,
    MailModule,
    CommentsModule,
    CommentLikesModule,
    ItemLikesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
