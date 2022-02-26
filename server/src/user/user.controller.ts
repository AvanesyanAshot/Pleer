import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthDto } from './dto/auth.dto';
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
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    try {
      const { refreshToken } = req.cookies;
      await this.UserService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return { msg: 'success' };
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
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
  async refresh(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await this.UserService.refresh(refreshToken);
      res.cookie('refreshToken', userData as string, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return { msg: 'success' };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('users')
  users() {
    return this.UserService.users();
  }
}
