import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  logger: Logger;
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.logger = new Logger();
  }
  async registration(dto: UserDto) {
    const candidate = await this.userModel.findOne(dto.email as any);
    if (candidate) {
      throw new Error(`User with this email ${dto.email} already exists `);
    }
    const user = await this.userModel.create({
      ...dto,
    });
    return user;
  }
  async login() {
    return 'login';
  }
  async logout() {
    return 'login';
  }
  async activateLink() {
    return 'activateLink';
  }
  async refresh() {
    return 'activateLink';
  }
  async users(): Promise<User[]> {
    return await this.userModel.find();
  }
}
