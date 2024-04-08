import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/Users.schema';
import { AppService } from 'src/app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '7d' },
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, AppService],
})
export class UsersModule { }
