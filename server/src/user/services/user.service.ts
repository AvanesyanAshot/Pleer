import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { MailService } from './mail.service';
import * as uuid from 'uuid';
import { UserNoPasswordDto } from '../dto/userNoPassword.dto';
import { AuthDto } from '../dto/auth.dto';

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
      isActivated: false,
      password: hashPassword,
      activationLink,
      tracks: [],
    });

    await this.mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/auth/activate/${activationLink}`,
    );
    this.logger.log(`User ${username} successfully registered `);
    const userDto = new UserNoPasswordDto(user);
    const tokens = this.tokenService.generateToken({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async login(dto: AuthDto) {
    const { email, password } = dto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User with this email was not found ');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new Error('Invalid password');
    }
    const userDto = new UserNoPasswordDto(user);
    const tokens = this.tokenService.generateToken({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async logout(refreshToken) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  async activate(activationLink: string) {
    const user = await this.userModel.findOne({ activationLink });
    if (!user) {
      throw new Error('Incorrect link');
    }
    user.isActivated = true;

    await user.save();
  }
  async refresh() {
    return 'activateLink';
  }
  async users(): Promise<User[]> {
    return await this.userModel.find();
  }
}
