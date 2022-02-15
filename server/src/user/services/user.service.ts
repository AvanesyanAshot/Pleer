import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { MailService } from './mail.service';
import uuid from 'uuid';
import { UserNoPasswordDto } from '../dto/userNoPassword.dto';

@Injectable()
export class UserService {
  logger: Logger;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private tokenService: TokenService,
    private mailService: MailService,
  ) {
    this.logger = new Logger();
  }
  async registration(dto: UserDto) {
    const { email, password, username } = dto;
    const candidate = await this.userModel.findOne({ email });
    if (candidate) {
      this.logger.error(`User with this email ${email} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await this.userModel.create({
      ...dto,
      password: hashPassword,
      activationLink,
      tracks: [],
    });
    this.mailService.sendActivationMail(email, activationLink);
    this.logger.log(`User ${username} successfully registered `);
    const userDto = new UserNoPasswordDto(user);
    const tokens = this.tokenService.generateToken({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
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
