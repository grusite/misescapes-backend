import { IsNotEmpty, IsEmail } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  createdAt?: Date;
}
