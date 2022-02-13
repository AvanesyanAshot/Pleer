import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/')
export class UserController {
  constructor(private UserService: UserService) {}
  @Post('/registration')
  registration() {
    return this.UserService.registration();
  }

  @Get('/login')
  login() {
    return this.UserService.login();
  }

  @Get('/logout')
  logout() {
    return this.UserService.logout();
  }

  @Get('/activateLink')
  activateLink() {
    return this.UserService.activateLink();
  }

  @Get('/refresh')
  refresh() {
    return this.UserService.refresh();
  }
}
