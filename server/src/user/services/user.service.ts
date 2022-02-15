import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  logger: Logger;
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.logger = new Logger();
  }
  async registration(dto: UserDto) {
    const { email, password, username } = dto;
    const candidate = await this.userModel.findOne({ email });
    if (candidate) {
      this.logger.error(`User with this email ${email} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await this.userModel.create({
      ...dto,
      password: hashPassword,
      tracks: [],
    });
    this.logger.log(`User ${username} successfully registered `);
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
