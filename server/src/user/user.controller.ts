import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './services/user.service';

@Controller('auth')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('registration')
  registration(@Body() dto: UserDto) {
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
