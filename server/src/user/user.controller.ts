import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './services/user.service';

@Controller('auth')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('registration')
  async registration(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: UserDto,
  ) {
    const userData = await this.UserService.registration(dto);
    return this.UserService.registration(dto);
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
