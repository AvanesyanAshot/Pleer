import { Body, Controller, Get, Logger, Post, Req, Res } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './services/user.service';
import { Response, Request } from 'express';

@Controller('auth')
export class UserController {
  logger: Logger;

  constructor(private UserService: UserService) {
    this.logger = new Logger();
  }

  @Post('registration')
  async registration(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() dto: UserDto,
  ) {
    try {
      const userData = await this.UserService.registration(dto);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Post('login')
  login() {
    return this.UserService.login();
  }

  @Post('logout')
  logout() {
    return this.UserService.logout();
  }

  @Get('activate-link')
  activateLink() {
    return this.UserService.activateLink();
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
