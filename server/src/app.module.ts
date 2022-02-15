import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.utklh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    TrackModule,
    UserModule,
  ],
})
//TODO Добавить .env
export class AppModule {}
