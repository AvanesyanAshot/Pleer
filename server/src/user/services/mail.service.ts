import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  sendActivationMail(to: string, link: string) {
    return `${to}, ${link}`;
  }
}
