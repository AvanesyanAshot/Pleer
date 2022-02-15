import { IsEmail } from 'class-validator';

export class UserNoPasswordDto {
  @IsEmail()
  email: string;
  id: string;
  isActivated: boolean;

  constructor(model: any) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}
