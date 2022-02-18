import { AuthDto } from './dto/auth.dto';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';
import { UserService } from './services/user.service';

@Controller('auth')
export class UserController {
  logger: Logger;

  constructor(private UserService: UserService) {
    this.logger = new Logger();
  }

  @Post('/registration')
  async registration(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: UserDto,
  ) {
    try {
      const userData = await this.UserService.registration(dto);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return { msg: 'success' };
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    try {
      const userData = await this.UserService.login(dto);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return { msg: 'success' };
    } catch (error) {
      //TODO Сделать фильтр ошибок
      throw new HttpException(error, 401);
    }
  }

  @Post('logout')
  logout() {
    return this.UserService.logout();
  }

  @Get('/activate/:link')
  async activate(
    @Res({ passthrough: true }) res: Response,
    @Param('link') link: string,
  ) {
    try {
      const activationLink = link;
      await this.UserService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Get('refresh')
  refresh() {
    return this.UserService.refresh();
  }

  @Get('users')
  users() {
    return this.UserService.users();
  }
}
