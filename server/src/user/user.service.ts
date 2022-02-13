import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  async registration() {
    return 'registration';
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
}
