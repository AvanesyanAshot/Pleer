import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';
import { User, UserSchema } from './schemas/user.schema';
import { MailService } from './services/mail.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  providers: [UserService, TokenService, MailService],
  controllers: [UserController],
})
export class UserModule {}
