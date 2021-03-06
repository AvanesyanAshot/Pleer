import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track, TrackDocument } from './schemas/track.schema';

//TODO Добавить комментарий к сервису
@Injectable()
export class TrackService {
  logger: Logger;
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {
    this.logger = new Logger();
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
    });
    this.logger.log(`Трек ${track.artist} добавлен`);
    return track;
  }

  async getAll(): Promise<Track[]> {
    const tracks = await this.trackModel.find();

    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id);
    return track;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    this.logger.log(`Трек ${track.artist} был удален`);

    return track._id;
  }
}
