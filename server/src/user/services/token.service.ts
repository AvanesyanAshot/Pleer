import { Token, TokenDocument } from './../schemas/token.schema';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';

@Injectable()
export class TokenService {
  logger: Logger;
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {
    this.logger = new Logger();
  }
  generateToken(payload) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_ABSOLUTE_SECRET,
      { expiresIn: '1h' },
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_ABSOLUTE_SECRET,
      { expiresIn: '30d' },
    );
    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await this.tokenModel.create({ user: userId, refreshToken });
    return token;
  }
}
