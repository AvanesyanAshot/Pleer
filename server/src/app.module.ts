import { TrackModule } from './track/track.module';
import { Module } from '@nestjs/common';

@Module({ imports: [TrackModule] })
export class AppModule {}
