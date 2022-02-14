import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
