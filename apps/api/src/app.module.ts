import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';

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
      // models: [User],
    }),
    UsersModule,
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.JWT_KEY,
    //   signOptions: { expiresIn: '1h' },
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
